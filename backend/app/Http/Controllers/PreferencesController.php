<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class PreferencesController extends Controller
{
    public function getall(){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $preferences = $user->preferences()->get();
        return response()->json(compact('preferences') ,200);
    }

    public function edit(Request $request){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('asd1', 404);
        }
        $preferences = $user->preferences()->get();
        if(!$preferences){
            return response()->json('asd2', 404);
        }
        $preference = $preferences->where('name', $request->name)->first();
        if(!$preference){
            return response()->json('asd3', 404);
        }
        $preference->value = $request->value;
        $preference->save();
        return response()->json(compact('preference'),200);
    }
}
