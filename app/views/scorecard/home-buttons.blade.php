<button id="start_match" type="button" class="btn btn-primary btn-lg btn-block">Start A Match</button>

@if($activeMatches)
	<button id="join_match" type="button" class="btn btn-primary btn-lg btn-block">Join Existing Match</button>
@endif

@if(Session::get('current_match'))
	<button id="play_round" type="button" class="btn btn-primary btn-lg btn-block">Resume Match</button>
@endif
