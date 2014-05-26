<?php

class HolesTableSeeder extends Seeder {

	public function run()
	{
		DB::table('holes')->insert(array(
			array('id' => 1, 'course_id' => 1, 'hole_number' => 1, 'par' =>  3, 'distance' => 320),
			array('id' => 2, 'course_id' => 1, 'hole_number' => 2, 'par' =>  3, 'distance' => 360),
			array('id' => 3, 'course_id' => 1, 'hole_number' => 3, 'par' =>  3, 'distance' => 245),
			array('id' => 4, 'course_id' => 1, 'hole_number' => 4, 'par' =>  3, 'distance' => 260),
			array('id' => 5, 'course_id' => 1, 'hole_number' => 5, 'par' =>  4, 'distance' => 615),
			array('id' => 6, 'course_id' => 1, 'hole_number' => 6, 'par' =>  3, 'distance' => 185),
			array('id' => 7, 'course_id' => 1, 'hole_number' => 7, 'par' =>  3, 'distance' => 170),
			array('id' => 8, 'course_id' => 1, 'hole_number' => 8, 'par' =>  3, 'distance' => 195),
			array('id' => 9, 'course_id' => 1, 'hole_number' => 9, 'par' =>  3, 'distance' => 150),
			array('id' => 10, 'course_id' => 1, 'hole_number' => 10, 'par' =>  3, 'distance' => 290),
			array('id' => 11, 'course_id' => 1, 'hole_number' => 11, 'par' =>  3, 'distance' => 285),
			array('id' => 12, 'course_id' => 1, 'hole_number' => 12, 'par' =>  3, 'distance' => 310),
			array('id' => 13, 'course_id' => 1, 'hole_number' => 13, 'par' =>  4, 'distance' => 475),
			array('id' => 14, 'course_id' => 1, 'hole_number' => 14, 'par' =>  3, 'distance' => 210),
			array('id' => 15, 'course_id' => 1, 'hole_number' => 15, 'par' =>  3, 'distance' => 155),
			array('id' => 16, 'course_id' => 1, 'hole_number' => 16, 'par' =>  4, 'distance' => 460),
			array('id' => 17, 'course_id' => 1, 'hole_number' => 17, 'par' =>  3, 'distance' => 270),
			array('id' => 18, 'course_id' => 1, 'hole_number' => 18, 'par' =>  4, 'distance' => 430)
		));
	}
}