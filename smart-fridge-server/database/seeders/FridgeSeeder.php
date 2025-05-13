<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Fridge;
use App\Models\User;
use App\Models\Meal;
use App\Models\FridgeItem;
use App\Models\MealIngredient;
use App\Models\ShoppingListItem;
use App\Models\ShoppingList;
use App\Models\Notification;

class FridgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        Fridge::factory() ->count(3) ->create() ->each(function ($fridge) use ($users) {

                $fridge->users()->attach($users->random(rand(1, 3))->pluck('id')->toArray());

                FridgeItem::factory()->count(5)->for($fridge)->create();

                Meal::factory() ->count(2) ->for($fridge) ->create() ->each(function ($meal) {
                        $meal->ingredients()->saveMany( MealIngredient::factory()->count(3)->make() );
                    });

                ShoppingList::factory() ->count(1) ->for($fridge) ->create() ->each(function ($list) {
                        $list->items()->saveMany( ShoppingListItem::factory()->count(4)->make() );
                    });
            });

        foreach ($users as $user) {
            $user->notifications()->saveMany( Notification::factory()->count(3)->make() );
        }
    }
}
