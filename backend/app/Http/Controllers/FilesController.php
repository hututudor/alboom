<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilesController extends Controller
{
    function getPicture($file_name){
        $extension = explode('.', $file_name)[count(explode('.', $file_name)) - 1];
        $file = base_path().'/storage/app/files/' . $file_name;
        $type = 'image/' . $extension;
        header('Content-Type:' . $type);
        header('Content-Length: ' . filesize($file));
        readfile($file);
    }

    static function uploadFile($request, $field_name, $directory, $allowed_extensions = array(), $multiple = false) {
        if ($multiple == false) {
            $file = $request->file($field_name);

            $ok = 0;
            if (count($allowed_extensions) > 0) {
                foreach ($allowed_extensions as $allowed_extension) {
                    if ($allowed_extension == strtolower($file->getClientOriginalExtension())) {
                        $ok = 1;
                        break;
                    }
                }
            } else {
                $ok = 1;
            }
            if ($ok == 0) {
                return false;
            }
            $name = rand(0, 99999) . time() . "." . strtolower($file->getClientOriginalExtension());
            $destinationPath = base_path() . '/storage/app/' . $directory . "/";
            $file->move($destinationPath, $name);
            return $name;
        } else {
            $uploaded_files = array();

            $files = $request->file($field_name);
            foreach ($files as $file) {

                $ok = 0;
                if (count($allowed_extensions) > 0) {
                    foreach ($allowed_extensions as $allowed_extension) {
                        if ($allowed_extension == strtolower($file->getClientOriginalExtension())) {
                            $ok = 1;
                            break;
                        }
                    }
                } else {
                    $ok = 1;
                }
                if ($ok == 0) {
                    array_push($uploaded_files, false);
                }
                $name = rand(0, 99999) . time() . "." . strtolower($file->getClientOriginalExtension());
                $destinationPath = base_path() . '/storage/app/' . $directory . "/";
                $file->move($destinationPath, $name);
                array_push($uploaded_files, $name);
            }
            return $uploaded_files;
        }
    }
}
