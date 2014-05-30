var match = {
	match_id: '',

	init: function() {
		$('#start_match').click(match.startMatch);
		$('#join_match').click(match.showExistingMatches);
		$('.go-home').click(match.goHome);
	},

	startMatch: function() {
		$.ajax({
			url: 'start-match/',
			dataType: 'json',
			type: 'post',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				refreshLayout();
				$('.course').click(match.registerCourse);
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
				refreshLayout();
			}
		});
	},

	showExistingMatches: function() {
		$.ajax({
			url: 'show-existing/',
			dataType: 'json',
			success: function(data) {
				document.getElementById('content').innerHTML = data.html;
				refreshLayout();
				$('.existing-matches').click(match.joinMatch);
			}
		});
	},

	joinMatch: function() {

	},
}

var scorecard = {

}

var player = {

}

function refreshLayout() {
	$("div[data-role=page]").page("destroy").page();
}

match.init();