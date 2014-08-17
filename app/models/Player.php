<?php

class Player extends Eloquent {

	public $timestamps = false;


	public function score()
	{
		return $this->hasMany('Score');
	}

	public function saveScoreCard($scorecard, $matchId)
	{
		foreach ($scorecard as $key => $value)
		{
			$score = Score::where('player_id', '=', $this->id)
							->where('match_id', '=', $matchId)
							->where('hole_id', '=', $value['id'])->first();

			if (!$score) {
				$score = new Score;
				$score->player_id = $this->id;
				$score->match_id = $matchId;
				$score->hole_id = $value['id'];
			}

			$score->score = $value['score'];
			$score->save();
		}
	}
}