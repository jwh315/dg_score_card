<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CourseTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('courses', function($table){
			$table->increments('id');
			$table->string('course_name');
		});

		Schema::create('holes', function($table){
			$table->increments('id');
			$table->integer('course_id');
			$table->integer('hole_number');
			$table->integer('par');
			$table->integer('distance');
		});

		Schema::create('players', function($table){
			$table->increments('id');
			$table->string('player_name');
			$table->float('handicap');
		});

		Schema::create('matches', function($table){
			$table->increments('id');
			$table->integer('course_id');
			$table->string('match_name');
			$table->boolean('complete');
		});

		Schema::create('scores', function($table){
			$table->increments('id');
			$table->integer('player_id');
			$table->integer('hole_id');
			$table->integer('match_id');
			$table->integer('score');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('courses');
		Schema::drop('holes');
		Schema::drop('players');
		Schema::drop('matches');
		Schema::drop('scores');
	}

}
