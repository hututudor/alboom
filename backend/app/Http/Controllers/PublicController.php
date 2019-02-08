<?php

namespace App\Http\Controllers;

use App\Album;
use App\Resource;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getAlbum($uuid){

        $album = Album::where('uuid', $uuid)->with('resources')->first();

        if(!$album){
            return response()->json('', 404);
        }

        if($album->public == 0){
            return response()->json('', 403);
        }

        return response()->json(compact('album'), 200);
    }

    public function getResource($uuid){

        $resource = Resource::where('uuid', $uuid)->with('album')->first();

        if(!$resource){
            return response()->json('', 404);
        }

        if($resource->album()->first()->public == 0){
            return response()->json('', 403);
        }

        return response()->json(compact('resource'), 200);
    }
}
