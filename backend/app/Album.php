<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function resources(){
        return $this->hasMany(Resource::class);
    }
}
