<?php

class Course extends Eloquent {

	public $timestamps = false;

	public function hole()
	{
		return $this->hasMany('Hole');
	}

	public function match()
	{
		return $this->hasMany('Match');
	}
}