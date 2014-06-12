<h4 class="text-center">Pick a Course</h4>

<div class="container">
	@foreach($courses as $course)
		<div class="row spacer">
			<div class="col-xs-1"></div>
			<div class="col-xs-10">
				<button type="button" id="{{{$course->id}}}" class="btn btn-primary btn-lg btn-block course">{{{$course->course_name}}}</button>
			</div>
			<div class="col-xs-1"></div>
		</div>
	@endforeach
</div>

