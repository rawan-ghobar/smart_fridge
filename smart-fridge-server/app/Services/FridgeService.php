<?php

namespace App\Services;

use App\Http\Requests\CreateFridgeRequest;
use App\Models\Fridge;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class FridgeService
{
    use ResponseTrait;

    public static function connect(Request $request)
    {
        $user = Auth::user();

        $data = $request->validated();

        $fridge = Fridge::where('code', $data['code'])->first();

        if (!$fridge || !Hash::check($data['password'], $fridge->password)) {

            return false;
        }

        $user->fridges()->syncWithoutDetaching([$fridge->id]);

        return $fridge;
    }
    public static function getFridges()
    {
        $user = Auth::user();
        $fridges = $user->fridges;
        return $fridges;
    }

    public static function addOrUpdateFridge(CreateFridgeRequest $request, $id = "null"){
        if ($id === "add") {
            $fridge = new Fridge;
            $fridge->user_id = Auth::id();
            $message = "Fridge added successfully";
        } else {
            $fridge = Fridge::find($id);
            if (!$fridge){
                return false;
            }
            $message = "Fridge info updated successfully";
        }

        $fridge->name = $request['name'];
        $fridge->code = $request["code"];
        $fridge->password = Hash::make($request["password"]);
        $fridge->save();

        return ['message' => $message,'fridge' => $fridge];
    }
    public static function disconnect(int $id)
    {
        $user=Auth::user();

        $fridge = $user->fridges()->find($id);

        if (!$fridge) {
            return false;
        }

        $user->fridges()->detach($fridge->id);

        return true;
    }

    public static function deleteFridge(int $id)
    {
        $fridge = Fridge::find($id);
        if (!$fridge) {
        return false;
        }

        $fridge->users()->detach();

        $fridge->delete();

        return true;
    }
}
