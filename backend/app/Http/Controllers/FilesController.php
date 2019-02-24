<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    function getFile($file_name){
        $filename = $file_name;
        $location = base_path().'/storage/app/files/' . $file_name;
        $mimeType = Storage::mimeType('/files/' . $file_name);

        if(@is_array(getimagesize($location))) {
            header('Content-Type:' . $mimeType);
            header('Content-Length: ' . filesize($location));
            readfile($location);
        }

        $size = filesize($location);
        $time = date('r', filemtime($location));

        $fm = @fopen($location, 'rb');
        if (!$fm) {
            header ("HTTP/1.1 505 Internal server error");
            return;
        }

        $begin  = 0;
        $end  = $size - 1;

        if (isset($_SERVER['HTTP_RANGE'])){
            if (preg_match('/bytes=\h*(\d+)-(\d*)[\D.*]?/i', $_SERVER['HTTP_RANGE'], $matches)) {
                $begin  = intval($matches[1]);
                if (!empty($matches[2])) {
                    $end  = intval($matches[2]);
                }
            }
        }
        if (isset($_SERVER['HTTP_RANGE'])) {
            header('HTTP/1.1 206 Partial Content');
        } else {
            header('HTTP/1.1 200 OK');
        }

        header("Content-Type: $mimeType");
        header('Cache-Control: public, must-revalidate, max-age=0');
        header('Pragma: no-cache');
        header('Accept-Ranges: bytes');
        header('Content-Length:' . (($end - $begin) + 1));
        if (isset($_SERVER['HTTP_RANGE'])) {
            header("Content-Range: bytes $begin-$end/$size");
        }
        header("Content-Disposition: inline; filename=$filename");
        header("Content-Transfer-Encoding: binary");
        header("Last-Modified: $time");

        $cur  = $begin;
        fseek($fm, $begin, 0);

        while(!feof($fm) && $cur <= $end && (connection_status() == 0)) {
            print fread($fm, min(1024 * 16, ($end - $cur) + 1));
            $cur += 1024 * 16;
        }
    }

    function downloadFile($file_name){
        $file = base_path().'/storage/app/files/' . $file_name;
        $type = 'application/octet-stream';
        header('Content-Type:' . $type);
        header('Content-Length: ' . filesize($file));
        readfile($file);
    }

    function downloadCLI($platform) {
        $file = '';

        if($platform == 'win') {
            $file = base_path().'/storage/app/cli/acli.exe';
        } else {
            $file = base_path().'/storage/app/cli/acli';
        }

        return Response::download($file);
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
