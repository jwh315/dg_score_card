<div class="container">
	<div class="row">
		<div class="col-xs-4">
			<button type="button" class="btn btn-default btn-md btn-block" onclick="Match.course.loadNextHole('back'); Match.setPlayerScores();">
				<span class="glyphicon glyphicon-chevron-left"></span>
			</button>
		</div>
		<div class="col-xs-4">
			<h4 class="text-center hole-number"></h4>
			<div class="text-center">
				<span>Par</span>
				<span class="par"></span>
				<span> - </span>
				<span class="distance"></span>
				<span>ft</span>
			</div>
		</div>
		<div class="col-xs-4">
			<button type="button" class="btn btn-default btn-md btn-block" onclick="Match.course.loadNextHole('forward'); Match.setPlayerScores();">
				<span class="glyphicon glyphicon-chevron-right"></span>
			</button>
		</div>
	</div>
</div>
<hr>

<div class="container" id="players">
	<div class="row player" style="display: none;">
		<div class="col-xs-4">
			<h5>
				<span class="current-score">( -1 )</span>
				<span class="player-name">Jacob</span>
			</h5>
		</div>
		<div class="col-xs-2 text-center"><h5 class="hole-score">3</h5></div>
		<div class="col-xs-6 text-right">
			<button type="button" class="btn btn-primary btn-lg increment" onclick="Match.tallyScore(this);">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
			<button type="button" class="btn btn-primary btn-lg decrement" onclick="Match.tallyScore(this);">
				<span class="glyphicon glyphicon-minus"></span>
			</button>
		</div>
		<input type="hidden" class="player-id" value="">
	</div>
</div>
<input type="hidden" id="current-hole">
