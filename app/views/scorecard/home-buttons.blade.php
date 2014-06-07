<div class="container-fluid">
	<div class="row spacer">
		<div class="col-xs-1"></div>
		<div class="col-xs-10">
			<button id="start_match" type="button" class="btn btn-primary btn-lg btn-block">Start A Match</button>
		</div>
		<div class="col-xs-1"></div>
	</div>

	@if($activeMatches)
		<div class="row spacer">
			<div class="col-xs-1"></div>
			<div class="col-xs-10">
				<button id="join_match" type="button" class="btn btn-primary btn-lg btn-block">Join Existing Match</button>
			</div>
			<div class="col-xs-1"></div>
		</div>
	@endif

	@if(Session::get('current_match'))
		<div class="row spacer">
			<div class="col-xs-1"></div>
			<div class="col-xs-10">
				<button id="play_round" type="button" class="btn btn-primary btn-lg btn-block">Resume Match</button>
			</div>
			<div class="col-xs-1"></div>
		</div>
	@endif
</div>
