<div class="container">
	<div class="row">
		<div class="col-xs-1"></div>
		<div class="col-xs-10">
			<div class="list-group">
				<a href="#" class="list-group-item active text-center">Active Matches</a>
				@foreach($matches as $match)
					<a href="#" id="{{{$match->id}}}" class="list-group-item text-center existing-matches">{{{$match->match_name}}}</a>
				@endforeach
			</div>
		</div>
		<div class="col-xs-1"></div>
	</div>
</div>
