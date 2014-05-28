var match = {
	match_id: '',

	init: function() {
		$('#start_match').click(match.startMatch);

	},

	startMatch: function() {
		$.ajax({
			url: 'start-match/',
			dataType: 'json',
			type: 'post',
			success: function(data) {
				console.log(data.html);
				document.getElementById('content').innerHTML = data.html;
				refreshLayout();
			}
		});
	}
}

var scorecard = {

}

var player = {

}

function refreshLayout() {
	$("div[data-role=page]").page("destroy").page();
}