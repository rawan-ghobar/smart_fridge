<?php
namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class ImageHelper
{
    public static function storeImage(UploadedFile $file, string $folder = 'fridge-images'): string
    {
        return storage_path('app/public/' . $file->store($folder, 'public'));
    }
}
