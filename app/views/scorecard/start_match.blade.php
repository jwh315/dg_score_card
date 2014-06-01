<h4 class="text-center">Pick a Course</h4>

@foreach($courses as $course)
	<button type="button" id="{{{$course->id}}}" class="btn btn-primary btn-lg btn-block course">{{{$course->course_name}}}</button>
@endforeach

