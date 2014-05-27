<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	//return Response::json(array('html' => View::make('scorecard.home')->render()));
	return View::make('scorecard.home');
});

Route::get('score/', function()
{
	return View::make('scorecard.score');
});

Route::get('start-match/', function()
{
	$courses = Course::all();
	return View::make('scorecard.start_match')
		->with('courses', $courses);
});

Route::get('register-match/course_id/{id}', function($id) {
	$match = new Match;
	$match->match_name = substr(md5(microtime()), 0, 5);
	$match->course_id = $id;
	$match->complete = false;
	$match->save();

	$insertID = $match->id;
	Session::put('current_match', $insertID . '-' . $match->match_name);

	return View::make('scorecard.score');
});


