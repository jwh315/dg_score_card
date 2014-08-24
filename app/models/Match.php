<?php


class Match extends Eloquent {

	public $timestamps = false;

	public function getLeaderBoard()
	{
		Log::info(__FILE__ . ' = ' . $this->id);
		$par = Course::getPar($this->course_id);
		$leaderboard = Score::groupBy('player_id')->join('players', 'player_id', '=', 'players.id')
									 	  ->where('match_id', '=', $this->id)
									 	  ->orderBy('total')
									 	  ->orderBy('player_name')
										  ->get(
										  			array(
										  					'player_id as id',
										  					'player_name as name',
										  					DB::raw("SUM(score) - $par as total")
									  					)
										  		);
		Log::info($leaderboard);
		return $this->formatLeaderArray($leaderboard);
	}

	public function formatLeaderArray($leaderboard)
	{
		$array = array();
		foreach ($leaderboard as $key => $value) {
			Log::info($value);
			if ($value['total'] < 0) {
	          	$score = $value['total'];
	        } else if ($value['total'] > 0) {
	          	$score = '+' . $value['total'];
	        } else {
	          	$score = 'E';
	        }

	        $array[] = array('player_id' => $value['id'], 'player_name' => $value['name'], 'total' => $score);
		}
		return $array;
	}
}