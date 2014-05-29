@extends('master')
@section('content')
	<a href="#" id="start_match" data-role="button">Start A Match</a>

	@if($activeMatches)
		<a href="#" id="join_match" data-role="button">Join Existing Match</a>
		<a href="#" id="play_round" data-role="button">Play!</a>
	@endif


@stop
