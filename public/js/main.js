/**
*
* functions that are either global to the app or js helper functions
*
**/
var App = {
	home: function() {
		App.ajax('home', 'GET', null, function(data){
			App.setContent(data.html);
			Match.init();
		});
	},

	hasClass: function (elem, className) {
	    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	},

	addClass: function (elem, className) {
	    if (!App.hasClass(elem, className)) {
	        elem.className += ' ' + className;
	    }
	},

	removeClass: function (elem, className) {
	    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
	    if (App.hasClass(elem, className)) {
	        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
	            newClass = newClass.replace(' ' + className + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	},

	setContent: function(html) {
		document.getElementById('content').innerHTML = html;
	},

	bindEvent: function(type, identifier, func) {
		[].forEach.call(document.querySelectorAll(identifier), function(el){
			el.addEventListener(type, func);
		});
	},

	ajax: function(url, type, data, func) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function(data) {
			if (httpRequest.readyState === 4) {
				var response = JSON.parse(data.srcElement.responseText);
				func(response);
			}
		};
		httpRequest.open('GET', url);
		httpRequest.send();
	},

	closeModal: function() {
		document.querySelectorAll('.modal')[0].style.display = "none";
	},

	displayErrorModal: function(msg) {
		document.querySelectorAll('.err-msg')[0].innerHTML = msg;
		document.querySelectorAll('.modal')[0].style.display = "block";
	}
}

/**
*
* match obj will handle most of the splash screen events
* and match setup functionality
*
**/
var Match = {
	match_id: '',
	course: '',
	players: [],

	init: function() {
		App.bindEvent('click', '#start_match', Match.startMatch);
		App.bindEvent('click', '#join_match', Match.showExistingMatches);
		App.bindEvent('click', '.mark-match-complete', Match.finishMatch);
		App.bindEvent('click', '.close-modal', App.closeModal);
	},

	startMatch: function() {
		App.ajax('start-match', 'GET', null, function(data) {
			App.setContent(data.html);
			App.bindEvent('click', '.course', Match.registerCourse);
		});
	},

	registerCourse: function() {
		var url = 'register-match/' + this.id;
		App.ajax(url, 'GET', null, function(data) {
			App.setContent(data.html);
			Match.bindPlayerEvents();
		});
	},

	showExistingMatches: function() {
		App.ajax('show-existing', 'GET', null, function(data) {
			App.setContent(data.html);
			App.bindEvent('click', '.existing-matches', Match.joinMatch);
		});
	},

	joinMatch: function() {
		var url = 'join-match/' + this.id;
		App.ajax(url, 'GET', null, function(data) {
			App.setContent(data.html);
			Match.bindPlayerEvents();
		});
	},

	finishMatch: function() {

	},

	bindPlayerEvents: function() {
		App.bindEvent('click', '.home', Match.goHome);
		App.bindEvent('click', '.play', Match.play);
		App.bindEvent('click', '#register-player', Player.register);
		App.bindEvent('click', '.select-player', Match.addPlayer);
	},

	play: function() {
		if (Match.players.length > 0) {
			App.ajax('play', 'GET', null, function(data) {
				App.setContent(data.html);
				Match.course = new Course(JSON.parse(data.holes));
				Match.course.loadNextHole('forward');

				for (var i = 0; i < Match.players.length; i++) {
					Match.players[i].initScorecard(JSON.parse(data.holes));
				};
			});
		} else {
			App.displayErrorModal('You really should pick at least one player!');
		}
	},

	addPlayer: function() {
		var parentDiv = this.parentNode.parentNode;
		var playerName = parentDiv.querySelectorAll('.player-name')[0].innerHTML;
		var playerId = parentDiv.querySelectorAll('.player-id')[0].value;

		Match.setIcon(parentDiv, 'select');

		Match.players.push(new Player(playerName, playerId));
	},

	removePlayer: function() {
		var parentDiv = this.parentNode.parentNode;
		var playerId = parentDiv.querySelectorAll('.player-id')[0].value;
		Match.setIcon(this.parentNode.parentNode, 'remove');
		for (var i = 0; i < Match.players.length; i++) {
			if (Match.players[i].id === playerId) {
				Match.players.splice(i, 1);
			}
		};
	},

	setIcon: function(parentDiv, action) {
		if (action == 'select') {
			var buttonIcon = parentDiv.querySelectorAll('.glyphicon-plus')[0];
			var button = parentDiv.querySelectorAll('.select-player')[0];

			button.removeEventListener('click', Match.addPlayer);
			button.addEventListener('click', Match.removePlayer);

			App.removeClass(buttonIcon, 'glyphicon-plus');
			App.addClass(buttonIcon, 'glyphicon-minus');

			App.removeClass(button, 'select-player');
			App.addClass(button, 'deselect-player');
		} else {
			var buttonIcon = parentDiv.querySelectorAll('.glyphicon-minus')[0];
			var button = parentDiv.querySelectorAll('.deselect-player')[0];

			button.removeEventListener('click', Match.removePlayer);
			button.addEventListener('click', Match.addPlayer);

			App.removeClass(buttonIcon, 'glyphicon-minus');
			App.addClass(buttonIcon, 'glyphicon-plus');

			App.removeClass(button, 'deselect-player');
			App.addClass(button, 'select-player');
		}
	}
}

/**
*
* the course object will hold all course/hole data. It will be
* responsible for iterating and displaying the current hole
* information on the score card.
*
**/
function Course(courseData) {
	this.holes = courseData;
	this.currentHole = 0;

	this.loadNextHole = function(direction) {
		var par = '';
		var distance = '';
		if (direction == 'forward') {
			if(!this.currentHole || this.currentHole == this.holes.length) {
				par = this.holes[0].par;
				distance = this.holes[0].distance;
				this.currentHole = 1;
			} else {
				par = this.holes[this.currentHole].par;
				distance = this.holes[this.currentHole].distance;
				this.currentHole += 1;
			}
		} else if (direction == 'back') {
			if (this.currentHole === 1) {
				this.currentHole = this.holes.length;
				par = this.holes[this.holes.length - 1].par;
				distance = this.holes[this.holes.length - 1].distance;
			} else {
				this.currentHole -= 1;
				par = this.holes[this.currentHole - 1].par;
				distance = this.holes[this.currentHole - 1].distance;
			}
		}
		this.setHoleInfo(par, distance, this.currentHole);
	}

	this.setHoleInfo = function(par, distance, holeNumber) {
		document.querySelectorAll('.par')[0].innerHTML = par;
		document.querySelectorAll('.distance')[0].innerHTML = distance;
		document.querySelectorAll('.hole-number')[0].innerHTML = 'Hole ' + holeNumber;
	}
}


/**
*
* Player obj will contain all pertant player info (name, id, scores)
*
**/
function Player(name, id) {
	this.name = name;
	this.id = id;
	this.scorecard = [];

	this.initScorecard = function(holes) {
		this.loadScoreCardArray(holes);
		this.buildScoreCardUI();
	}

	this.buildScoreCardUI = function() {
		var newPlayerDiv = document.querySelectorAll('.player')[0].cloneNode(true);

		newPlayerDiv.querySelectorAll('.player-name')[0].innerHTML = this.name;
		newPlayerDiv.querySelectorAll('.player-id')[0].value = this.id;

		newPlayerDiv.style.display = 'block';

		document.getElementById('players').appendChild(newPlayerDiv);
	}

	this.loadScoreCardArray = function(holes) {
		for (var i = 0; i < holes.length; i++) {
			this.scorecard.push(new Hole(holes[i].hole_number, holes[i].par));
		};
	}

	this.loadNextHole = function(direction) {

	}

	this.currentScore = function() {

	}
}

Player.register = function() {
	var playerName = document.getElementById('register-player-name');
	var url = 'register-player/' + playerName.value;
	App.ajax(url, 'GET', null, function(data) {
		if (data.player_id) {
			var newPlayerDiv = document.querySelectorAll('.player')[0].cloneNode(true);

			newPlayerDiv.querySelectorAll('.player-name')[0].innerHTML = playerName.value;
			newPlayerDiv.querySelectorAll('.player-id')[0].value = data.player_id;
			newPlayerDiv.querySelectorAll('.select-player')[0].addEventListener('click', Player.selectPlayer);

			newPlayerDiv.style.display = 'block';

			document.getElementById('registered-players').appendChild(newPlayerDiv);
			playerName.value = '';
		}
	});
}

/**
*
* Block comment
*
**/
function Hole(number, par) {
	this.number = number;
	this.par = par;
	this.score = par;
}

Match.init();
