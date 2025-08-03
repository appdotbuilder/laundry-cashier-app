<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated admin can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create(['role' => 'admin']));

    $this->get('/dashboard')->assertOk();
});

test('authenticated customer can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create(['role' => 'customer']));

    $this->get('/dashboard')->assertOk();
});

test('authenticated staff can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create(['role' => 'staff']));

    $this->get('/dashboard')->assertOk();
});

test('authenticated courier can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create(['role' => 'courier']));

    $this->get('/dashboard')->assertOk();
});
