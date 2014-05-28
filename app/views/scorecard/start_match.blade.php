<div class="ui-grid-b">
	<div class="ui-block-a"></div>
	<div class="ui-block-b hole-number"><h4>Pick a Course</h4></div>
	<div class="ui-block-c"></div>
</div>

<ul data-role="listview" data-inset="true">
	@foreach($courses as $course)
		<li>
			<a href="{{url('register-match/course_id/' . $course->id)}}">{{{$course->course_name}}}</a>
		</li>
	@endforeach
</ul>
