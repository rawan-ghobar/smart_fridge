<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('daily_calories')->nullable();
            $table->string('diet_type')->nullable();
            $table->json('allergies')->nullable();
            $table->json('disliked_ingredients')->nullable();
            $table->json('favorite_ingredients')->nullable();
            $table->unsignedTinyInteger('days_before_expiry')->default(3);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
