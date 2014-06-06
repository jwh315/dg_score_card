var match = {
	match_id: '',

	init: function() {
		$('#start_match').bind('click', match.startMatch);
		$('#join_match').bind('click', match.showExistingMatches);
		$('.go-home').bind('click', match.goHome);
		$('.mark-match-complete').bind('click', match.finishMatch);
	},

	startMatch: function() {
		console.log(base_url);
		$.ajax({
			url: 'start-match',
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				$('.course').bind('click', match.registerCourse);
			}
		});
	},

	registerCourse: function() {
		var id = $(this).attr('id');
		$.ajax({
			url: 'register-match/' + id,
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				$('.active-match-name').text(data.active_match);
				match.bindPlayerEvents();
			}
		});
	},

	showExistingMatches: function() {
		$.ajax({
			url: 'show-existing',
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				$('.existing-matches').bind('click', match.joinMatch);
			}
		});
	},

	joinMatch: function() {
		var id = $(this).attr('id');
		$.ajax({
			url: 'join-match/' + id,
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				$('.active-match-name').text(data.active_match);
				match.bindPlayerEvents();
			}
		});
	},

	finishMatch: function() {

	},

	bindPlayerEvents: function() {
		$('.home').bind('click', match.goHome);
		$('.play').bind('click', match.play);
		$('#register-player').bind('click', Player.register);
		$('.select-player').bind('click', Player.selectPlayer);
	},

	play: function() {
		$.ajax({
			url: 'play',
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
			}
		});
	},

	goHome: function() {

	}
}

var scorecard = [

]

function Player(name, id) {
	this.name = name;
	this.id = id;
}

Player.register = function() {
	var playerName = document.getElementById('register-player-name');
	if (playerName.value) {
		$.ajax({
			url: 'register-player/' + playerName.value,
			dataType: 'json',
			success: function(data) {
				if (data.player_id) {
					var newPlayerDiv = document.querySelectorAll('.player')[0].cloneNode(true);

					newPlayerDiv.querySelectorAll('.player-name')[0].innerHTML = playerName.value;
					newPlayerDiv.querySelectorAll('.player-id')[0].value = data.player_id;
					newPlayerDiv.style.display = 'table';
					document.getElementById('registered-players').appendChild(newPlayerDiv);
					playerName.value = '';
				}
			}
		});
	}
}

Player.selectPlayer = function() {
	var parentDiv = this.parentNode.parentNode.parentNode;
	var playerId = parentDiv.querySelectorAll('.player-id')[0].value;
	var playerName = parentDiv.querySelectorAll('.player-name')[0].innerHTML;

	scorecard.push(new Player(playerName, playerId));
}

function home() {
	$.ajax({
		url: 'home',
		dataType: 'json',
		success: function(data) {
			document.getElementById('content').innerHTML = data.html;
			match.init();
		}
	});
}

$(document).ready(function(){
	match.init();
});