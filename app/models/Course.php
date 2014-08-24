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

	public static function getPar($id)
	{
		return Hole::where('course_id', '=', $id)->sum('par');
	}

	public function getCourseInitials()
	{
		$words = explode(' ', $this->course_name);
		$initials = '';
		foreach ($words as $key => $value) {
			$initials .= $value[0];
		}
		return $initials;
	}
}