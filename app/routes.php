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
	$activeMatches = Match::where('complete', 0)->count();
	return View::make('scorecard.home')->with('activeMatches', $activeMatches);
});

Route::get('start-match/', function()
{
	$courses = Course::all();
	$json = array();
	$json['html'] = View::make('scorecard.start_match')
					->with('courses', $courses)->render();
	return Response::json($json);
});

Route::get('register-match/{id}', function($id)
{
	$match = new Match;
	$match->match_name = substr(md5(microtime()), 0, 5);
	$match->course_id = $id;
	$match->complete = false;
	$match->save();

	$insertID = $match->id;
	Session::put('current_match', $match->match_name);
	$json = array();
	$json['html'] = View::make('scorecard.score')->render();
	$json['active_match'] = Session::get('current_match');
	return Response::json($json);
});

Route::get('join-match/{id}', function($id)
{
	$match = Match::find($id);
	Session::put('current_match', $match->match_name);
	$json = array();
	$json['html'] = View::make('scorecard.score')->render();
	$json['active_match'] = Session::get('current_match');
	return Response::json($json);
});

Route::get('show-existing/', function()
{
	$matches = Match::where('complete', 0)->orderBy('id', 'DESC')->get();
	$json = array();
	$json['html'] = View::make('scorecard.existing-matches')
					->with('matches', $matches)
					->render();
	return Response::json($json);
});


