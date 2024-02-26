<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $tel = str_replace('-', '', fake()->phoneNumber());
        $address = mb_substr(fake()->address, 9);
        return [
            'name' => fake()->name(), 
            'kana' => fake()->kanaName(), 
            'tel' => $tel, 
            'email' => fake()->email(), 
            'postcode' => fake()->postcode(), 
            'address' => $address, 
            'birthday' => fake()->dateTime(), 
            'gender' => fake()->numberBetween(0, 2),     
            'memo' => fake()->realText(50),             
        ];
    }
}
