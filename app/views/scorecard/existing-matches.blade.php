<div class="list-group">
	<a href="#" class="list-group-item active text-center">Active Matches</a>
	@foreach($matches as $match)
		<a href="#" id="{{{$match->id}}}" class="list-group-item text-center existing-matches">{{{$match->match_name}}}</a>
	@endforeach
</div>
