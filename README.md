# AlBoom
The easiest way to add an interactive multi-media album to your webpage.

## How it works

 - To add an album to your webpage, you must make an account first.
 - After that, if you enter the dahboard, in the albums section, you can create a new album.
 - Click the album and enter the resources section. You can add the files you want to be displayed here.
 - You can set transition to them and other properties.
 - If you want to export individual resources, click the export button on the resource and copy the iframe component in your html file.
 - You can export an album by clicking the export button on the album.
 - If you make an album private, it will no longer show in your page.

## Instalation

1. Install [ffmpeg](https://ffmpeg.org/), [node](https://nodejs.org/en/), [composer](https://getcomposer.org/), [php](http://php.net) 
2. Backend
  - `cd backend`
  - `cp .env.example .env`
  - Edit the .env file to match your database configuration
  - `composer install`
  - `php artisan jwt:secret`
  - `php artisan key:gen`
  - `php artisan migrate:fresh`
  - `php artisan serve`
  - This should open a webserver on localhost, port 8000
  - It is recommended that you chnge the php.ini `MAX_POST_SIZE` and `MAX_FILE_UPLOAD_SIZE` to allow large files to be uploaded.

3. Frontend
  - `cd frontend`
  - `npm install`
  - `npm start`
  - This should open a server on port 3000

## Technologies used

- Laravel, for the backend
- React with a few packages like Redux and Router, for the frontend
- Semantic UI as the UI library

## How to use the CLI

- Searching an album: `acli search NAME`
- List an album: `acli album UUID -n`
- List a resurce: `acli resource UUID -n`
- Download an album: `acli album UUID -d`
- Download a resource: `acli resource UUID -d`

## Contribuitors

- **Hutu Tudor** - frontend
- **Baroncea Andrei** - backend