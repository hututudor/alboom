<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('album_id');
            $table->string('uuid');
            $table->string('name');
            $table->string('location');
            $table->string('type');
            $table->string('transition');
            $table->boolean('loop')->default(false);
            $table->boolean('mute')->default(false);
            $table->boolean('muted')->default(false);
            $table->timestamps();

            $table->foreign('album_id')->refrences('id')->on('albums');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resources');
    }
}
