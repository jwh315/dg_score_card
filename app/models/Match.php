<?php


class Match extends Eloquent {

	public $timestamps = false;

	public function getLeaderBoard()
	{
		$par = Course::getPar($this->course_id);
		return Score::groupBy('player_id')->join('players', 'player_id', '=', 'players.id')
									 	  ->where('match_id', '=', $this->id)
									 	  ->orderBy('total')
										  ->get(
										  			array(
										  					'player_id',
										  					'player_name',
										  					DB::raw("SUM(score) - $par as total")
									  					)
										  		)->toJson();
	}
}