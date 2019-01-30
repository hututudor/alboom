<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    public function album(){
        return $this->belongsTo(Album::class);
    }
}
