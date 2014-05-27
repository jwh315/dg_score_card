<?php

class CoursesTableSeeder extends Seeder {

	public function run()
	{
		DB::table('courses')->insert(array(
			array('id' => 1, 'course_name' => "Paseo Vista"),
			array('id' => 2, 'course_name' => "Fiesta Lakes"),
			array('id' => 3, 'course_name' => "Red Mountain"),
			array('id' => 4, 'course_name' => "Mesquite Groves"),
		));
	}
}