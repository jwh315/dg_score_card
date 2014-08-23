<?php


class Match extends Eloquent {

	public $timestamps = false;

	public function getLeaderBoard()
	{
		$par = Course::getPar($this->course_id);
		$leaderboard = Score::groupBy('player_id')->join('players', 'player_id', '=', 'players.id')
									 	  ->where('match_id', '=', $this->id)
									 	  ->orderBy('total')
									 	  ->orderBy('player_name')
										  ->get(
										  			array(
										  					'player_id',
										  					'player_name',
										  					DB::raw("SUM(score) - $par as total")
									  					)
										  		);
		return $this->formatLeaderArray($leaderboard);
	}

	public function formatLeaderArray($leaderboard)
	{
		$array = array();
		foreach ($leaderboard as $key => $value) {
			if ($value['total'] < 0) {
	          	$score = $value['total'];
	        } else if ($value['total'] > 0) {
	          	$score = '+' . $value['total'];
	        } else {
	          	$score = 'E';
	        }

	        $array[] = array('player_id' => $value['player_id'], 'player_name' => $value['player_name'], 'total' => $score);
		}
		return $array;
	}
}