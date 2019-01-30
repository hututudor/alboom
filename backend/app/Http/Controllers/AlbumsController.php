<?php

namespace App\Http\Controllers;

use App\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\New_;
use Webpatser\Uuid\Uuid;

class AlbumsController extends Controller
{
    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
            'public' => ['required', 'integer'],
            'controls' => ['required', 'integer'],
            'autoplay' => ['required', 'integer'],
        ]);
        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $album = new Album();
        $album->user_id = $user->id;
        $album->uuid =str_replace('-', '', Uuid::generate(4));
        $album->name = $request->name;
        $album->color = $request->color;
        if($request->public)
            $album->public = $request->public;
        if($request->controls)
            $album->controls = $request->controls;
        if($request->autoplay)
            $album->autoplay = $request->autoplay;
        $album->save();
        return response()->json(compact('album'), 200);
    }

    public function edit(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'color' => ['required', 'string', 'max:255'],
            'public' => ['required', 'integer'],
            'controls' => ['required', 'integer'],
            'autoplay' => ['required', 'integer'],
        ]);
        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $album = Album::where('uuid', $request->uuid)->first();
        if(!$album){
            return response()->json('', 404);
        }
        if($album->user_id != $user->id){
            return response()->json('', 403);
        }
        $album->name = $request->name;
        $album->color = $request->color;
        $album->public = $request->public;
        $album->controls = $request->controls;
        $album->autoplay = $request->autoplay;
        $album->save();
        return response()->json(compact('album'), 200);
    }

    public function delete($uuid){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $album = Album::where('uuid', $uuid)->first();
        if(!$album){
            return response()->json('', 404);
        }
        if($album->user_id != $user->id){
            return response()->json('', 403);
        }
        $album->delete();
        return response()->json('', 200);
    }

    public function getall(){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $albums = $user->albums()->orderBy('created_at', 'desc')->get();
        return response()->json(compact('albums'), 200);
    }

    public function get($uuid){
        $user = AuthController::getUser();
        if(!$user) {
            return response()->json('', 404);
        }
        $album = Album::where('uuid', $uuid)->first();
        if(!$album){
            return response()->json('', 404);
        }
        if($album->user_id != $user->id){
            return response()->json('', 403);
        }
        return response()->json(compact('album'), 200);
    }
}
