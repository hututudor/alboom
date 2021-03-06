<?php

namespace App\Http\Controllers;

use App\Album;
use App\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Webpatser\Uuid\Uuid;

class ResourcesController extends Controller {

    private $extensions = 'mimes:jpeg,jpg,png,mp4,mpeg,mp3,mpg,mpga,gif,svg';

    public function add(Request $request, $album_uuid) {
        $validator = Validator::make($request->all(), [
            'location' => ['required', 'file', $this->extensions],
        ]);

        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }

        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $album = Album::where('uuid', $album_uuid)->first();

        if(!$album){
            return response()->json('', 404);
        }

        $location = FilesController::uploadFile($request, 'location', '/files', config('extensions.allowed'), false);

        if(!$location) {
            return response()->json('', 400);
        }

        $c = 0;
        if($request->file('location')->getClientMimeType() == 'video/mpeg') {
            shell_exec("ffmpeg -i " . storage_path() . '/app/files/' . $location . " -c:a copy -c:v libx264 -preset superfast -profile:v baseline " . storage_path() . '/app/files/' . explode('.', $location)[0] . '.mp4');
            shell_exec("rm -f " . storage_path() . '/app/files/' . $location);
            $c = 1;
        }

        $resource = new Resource();
        $resource->album_id = $album->id;
        $resource->uuid = str_replace('-', '', Uuid::generate(4));
        $resource->name = pathinfo($request->file('location')->getClientOriginalName(), PATHINFO_FILENAME);
        $resource->location = $c == 0 ? $location : explode('.', $location)[0] . '.mp4';
        $resource->type = $c == 0 ? $request->file('location')->getClientOriginalExtension() : 'mpg';
        $resource->transition = "none";
        $resource->loop = 0;
        $resource->mute = 0;
        $resource->muted = 0;
        $resource->save();

        return response()->json(compact('resource'), 200);
    }

    public function edit(Request $request, $uuid){
        $validator = Validator::make($request->all(), [
            'name' => ['string', 'required'],
            'transition' => ['required', 'string', 'max:255'],
            'loop' => ['required', 'integer'],
            'mute' => ['required', 'integer'],
            'muted' => ['required', 'integer'],
        ]);

        if($validator->fails() ) {
            return response()->json($validator->errors(), 400);
        }

        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $resource = Resource::where('uuid', $uuid)->first();

        if(!$resource){
            return response()->json('', 404);
        }

        if($resource->album()->first()->user()->first()->id != $user->id){
            return response()->json('', 403);
        }


        $resource->name = $request->name;
        $resource->transition = $request->transition;
        $resource->loop = $request->loop;
        $resource->mute = $request->mute;
        $resource->muted = $request->muted;
        $resource->save();

        return response()->json(compact('resource'), 200);
    }

    public function delete($uuid){
        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $resource = Resource::where('uuid', $uuid)->first();

        if(!$resource){
            return response()->json('', 404);
        }

        if($resource->album->user->id != $user->id){
            return response()->json('', 403);
        }

        Storage::delete('files/' . $resource->location);
        $resource->delete();

        return response()->json('', 200);
    }

    public function getAll($album_uuid){
        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $album = Album::where('uuid', $album_uuid)->first();

        if(!$album) {
            return response()->json('', 404);
        }

        if($album->user_id != $user->id){
            return response()->json('', 403);
        }

        $resources = $album->resources()->orderBy('created_at', 'desc')->get();

        return response()->json(compact('resources'), 200);
    }

    public function get($uuid){
        $user = AuthController::getUser();

        if(!$user) {
            return response()->json('', 404);
        }

        $resource = Resource::where('uuid', $uuid)->first();

        if(!$resource){
            return response()->json('', 404);
        }

        if($resource->album()->first()->user()->first()->id != $user->id){
            return response()->json('', 403);
        }

        return response()->json(compact('resource'), 200);
    }
}
