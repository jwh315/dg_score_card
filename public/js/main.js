var match = {
	match_id: '',

	init: function() {
		$('#start_match').bind('click touchstart', match.startMatch);
		$('#join_match').bind('click touchstart', match.showExistingMatches);
		$('.go-home').bind('click touchstart', match.goHome);
		$('.mark-match-complete').bind('click touchstart', match.finishMatch);
	},

	startMatch: function() {
		console.log(base_url);
		$.ajax({
			url: 'start-match',
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				$('.course').bind('click touchstart', match.registerCourse);
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
			}
		});
	},

	showExistingMatches: function() {
		$.ajax({
			url: 'show-existing',
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				$('.existing-matches').bind('click touchstart', match.joinMatch);
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
			}
		});
	},

	finishMatch: function() {

	}
}

var scorecard = {

}

var player = {

}

function refreshLayout() {
	//$("div[data-role=page]").page("destroy").page();
}

$(document).ready(function(){
	match.init();
})