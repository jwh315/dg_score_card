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

Route::any('/', function()
{
	$activeMatches = Match::where('complete', 0)->count();
	return View::make('scorecard.home')->with('activeMatches', $activeMatches);
});

Route::any('home/', function() {
	$activeMatches = Match::where('complete', 0)->count();
	return Response::json(array('html' => View::make('scorecard.home-buttons')->with('activeMatches', $activeMatches)->render()));
});

Route::any('start-match/', function()
{
	$courses = Course::all();
	$json = array();
	$json['html'] = View::make('scorecard.start_match')
					->with('courses', $courses)->render();
	return Response::json($json);
});

Route::any('register-match/{id}', function($id)
{
	$match = new Match;
	$match->match_name = substr(md5(microtime()), 0, 5);
	$match->course_id = $id;
	$match->complete = false;
	$match->save();

	$insertID = $match->id;
	Session::put('current_match', $match->match_name);
	$players = Player::orderBy('player_name', 'ASC')->get();
	$json['html'] = View::make('scorecard.player')->with('players', $players)->render();
	$json['active_match'] = Session::get('current_match');
	return Response::json($json);
});

Route::any('join-match/{id}', function($id)
{
	$match = Match::find($id);
	Session::put('current_match', $match->match_name);

	$players = Player::orderBy('player_name', 'ASC')->get();
	$json = array();
	$json['html'] = View::make('scorecard.player')->with('players', $players)->render();
	$json['active_match'] = Session::get('current_match');
	return Response::json($json);
});

Route::any('show-existing/', function()
{
	$matches = Match::where('complete', 0)->orderBy('id', 'DESC')->get();
	$json = array();
	$json['html'] = View::make('scorecard.existing-matches')
					->with('matches', $matches)
					->render();
	return Response::json($json);
});

Route::any('play/', function() {
	$match = Match::where('match_name', Session::get('current_match'))->first();
	$json = array();
	$json['html'] = View::make('scorecard.score')->render();
	$json['holes'] = Hole::where('course_id', $match->course_id)->get()->toJson();
	return Response::json($json);
});

Route::any('player-view/', function()
{
	$json = array();
	$json['html'] = View::make('scorecard.score')->render();
	return Response::json($json);
});

Route::any('register-player/{name}', function($name){
	$player = new Player;
	$player->player_name = strtolower($name);
	$player->handicap = 0;
	$player->save();

	$json = array();
	$json['player_id'] = $player->id;
	return Response::json($json);
});

Route::any('post-scores', function() {
	$input = Input::all();
	$match = Match::where('match_name', $input['matchId'])->first();
	foreach ($input['players'] as $key => $value) {
		$player = new Player();
		$player->id = $value['id'];
		$player->saveScoreCard($value['scorecard'], $match->id);
	}

	$json = array();
	$json['leaderboard'] = View::make('scorecard.leaderboard')->with('leaderboard', $match->getLeaderBoard())->render();
	return Response::json($json);
});



