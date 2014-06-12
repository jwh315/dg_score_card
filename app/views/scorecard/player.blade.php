<div class="container">
	<div class="row">
		<div class="col-xs-4">
			<button type="button" class="btn btn-default btn-md btn-block" onclick="App.home();">
				<span class="glyphicon glyphicon-home"></span>
			</button>
		</div>
		<div class="col-xs-4"><h4 class="text-center">Players</h4></div>
		<div class="col-xs-4">
			<button type="button" class="btn btn-default btn-md btn-block play">
				<span class="glyphicon glyphicon-play"></span>
			</button>
		</div>
	</div>
</div>

<hr>

<div class="container">
	<div class="row">
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

<hr>

<div class="container"  id="registered-players">

	<div class="row player" style="display: none;">
		<div class="col-xs-8">
			<h4 class="player-name"></h4>
		</div>
		<div class="col-xs-4 ">
			<button type="button" class="btn btn-primary btn-lg btn-block select-player">
				<span class="glyphicon glyphicon-plus"></span>
			</button>
		</div>
		<input type="hidden" class="player-id" value="">
	</div>

	@foreach($players as $player)

		<div class="row player">
			<div class="col-xs-8">
				<h4 class="player-name">{{$player->player_name}}</h4>
			</div>
			<div class="col-xs-4 ">
				<button type="button" class="btn btn-primary btn-lg btn-block select-player">
					<span class="glyphicon glyphicon-plus"></span>
				</button>
			</div>
			<input type="hidden" class="player-id" value="{{$player->id}}">
		</div>

	@endforeach
</div>