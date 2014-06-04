<div class="container-fluid">
	<div class="row-fluid">
		<div class="col-xs-4">
			<button type="button" class="btn btn-default btn-md btn-block" onclick="home();">
				<span class="glyphicon glyphicon-home"></span>
			</button>
		</div>
		<div class="col-xs-4"><h5 class="text-center">Players</h5></div>
		<div class="col-xs-4">
			<button type="button" class="btn btn-default btn-md btn-block play">
				<span class="glyphicon glyphicon-play"></span>
			</button>
		</div>
	</div>
</div>

<hr>

<div class="container-fluid">
	<div class="row-fluid">
		<div class="col-xs-8 text-right">
			<input type="text" class="form-control input-block-level" id="register-player-name" placeholder="Register New Player">
		</div>
		<div class="col-xs-4 ">
			<button id="register-player" type="button" class="btn btn-primary btn-md btn-block">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
		</div>
	</div>
</div>

@foreach($players as $player)
	<p>{{$player->player_name}}</p>
@endforeach