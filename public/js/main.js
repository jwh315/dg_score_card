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
		App.hideLoader();
		document.getElementById('content').innerHTML = html;
	},

	showLoader: function() {
		// var marginTop = (screen.height - document.querySelectorAll('.navbar-header')[0].offsetHeight) / 2 - 150;
		document.getElementById('content').innerHTML = null;

		var loader = document.querySelectorAll('.loader')[0];
		// loader.style.marginTop = marginTop + 'px';
		loader.style.display = "block";
	},

	hideLoader: function() {
		document.querySelectorAll('.loader')[0].style.display = "none";
	},

	bindEvent: function(type, identifier, func) {
		[].forEach.call(document.querySelectorAll(identifier), function(el){
			el.addEventListener(type, func);
		});
	},

	ajax: function(url, type, data, func, hideLoader) {
		if (!hideLoader) {
			App.showLoader();
		}
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
	},

	setCookie: function(name, players, course) {
		var tmpObj = {};
		tmpObj[name] = players;
		tmpObj['course'] = course;
		var date = new Date(+new Date + 12096e5);
		var cookie = "active_match=" + JSON.stringify(tmpObj) + '; expires=' + date.toGMTString();
		document.cookie = cookie;
	},

	getCookie: function(name) {
		var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
		if (result != undefined) {
	 		return JSON.parse(result[1]);
		}
	},

	deleteCookie: function(name) {
		document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01;'
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
	players: {},

	init: function() {
		App.bindEvent('click', '#start_match', Match.startMatch);
		App.bindEvent('click', '#join_match', Match.showExistingMatches);
		App.bindEvent('click', '.mark-match-complete', Match.finishMatch);
		App.bindEvent('click', '.close-modal', App.closeModal);

		Match.setHomeScreenButtons();
	},

	setHomeScreenButtons: function() {
		var active_match = Match.getActiveMatch();
		var resumeButton = document.querySelectorAll('.resume-match')[0];
		if (active_match != undefined && Object.keys(active_match).length > 0) {
			resumeButton.style.display = 'block';
			resumeButton.addEventListener('click', Match.resumeMatch);
		} else {
			resumeButton.style.display = 'none';
			resumeButton.removeEventListener('click', Match.resumeMatch);
		}
	},

	resumeMatch: function() {
		Match.players = {};
		var active_match = Match.getActiveMatch();

		App.ajax('player-view', 'GET', null, function(data) {
			App.setContent(data.html);
			for (var match_id in active_match) {
				if (match_id != 'course') {
					Match.match_id = match_id;

					for (var player_id in active_match[match_id]) {
						if (parseInt(player_id)) {
							var name = active_match[match_id][player_id].name;
							Match.players[player_id] = new Player(name, player_id);
							Match.players[player_id].scorecard = active_match[match_id][player_id].scorecard;
							Match.players[player_id].score = active_match[match_id][player_id].score;
							Match.players[player_id].resumeMatch();
							Match.players[player_id].loadNextHole(active_match['course'].currentHole);
						}
					}
				} else if (match_id == 'course') {
					Match.course = new Course(active_match['course'].holes);
					Match.course.currentHole = active_match['course'].currentHole;
					var hole = Match.course.holes[Match.course.currentHole - 1];
					Match.course.setHoleInfo(hole.par, hole.distance, Match.course.currentHole);
				}
			}
		});

	},

	getActiveMatch: function() {
		return App.getCookie('active_match');
	},

	startMatch: function() {
		App.ajax('start-match', 'GET', null, function(data) {
			App.setContent(data.html);
			App.bindEvent('click', '.course', Match.registerCourse);
		});
		Match.players = {};
	},

	registerCourse: function() {
		var url = 'register-match/' + this.id;
		App.ajax(url, 'GET', null, function(data) {
			App.setContent(data.html);
			Match.match_id = data.active_match;
			Match.bindPlayerEvents();
		});
	},

	showExistingMatches: function() {
		App.ajax('show-existing', 'GET', null, function(data) {
			App.setContent(data.html);
			App.bindEvent('click', '.existing-matches', Match.joinMatch);
		});
		Match.players = {};
	},

	joinMatch: function() {
		var url = 'join-match/' + this.id;
		App.ajax(url, 'GET', null, function(data) {
			App.setContent(data.html);
			Match.bindPlayerEvents();
			Match.match_id = data.active_match;
		});
		Match.players = {};
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
		if (Object.keys(Match.players).length > 0) {
			App.ajax('play', 'GET', null, function(data) {
				App.setContent(data.html);
				Match.course = new Course(JSON.parse(data.holes));
				Match.course.loadNextHole('forward');

				for (var id in Match.players) {
					Match.players[id].initScorecard(JSON.parse(data.holes));
				}
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

		Match.players[playerId] = new Player(playerName, playerId);
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

	tallyScore: function(element) {
		var bIncrement = (App.hasClass(element, 'increment')) ? true : false;
		var playerId = element.parentNode.parentNode.querySelectorAll('.player-id')[0].value;

		for (var id in Match.players) {
			if (id == playerId) {
				Match.players[id].setHoleScore(document.getElementById('current-hole').value, bIncrement);
				break;
			}
		}
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
	},

	setPlayerScores: function() {
		for (var id in Match.players) {
			Match.players[id].loadNextHole(document.getElementById('current-hole').value);
		}
		App.setCookie(Match.match_id, Match.players, Match.course);
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
		document.getElementById('current-hole').value = holeNumber;
	}
}


/**
*
* Player obj will contain all pertant player info (name, id, scores) as
* well as functions to manipulate player scores and player display, an
* array of active players will be stored in the Match object
*
**/
function Player(name, id) {
	this.name = name;
	this.id = id;
	this.scorecard = {};
	this.score = 0;

	this.initScorecard = function(holes) {
		this.loadScoreCardArray(holes);
		this.buildScoreCardUI();
		this.calcCurrentScore();
		this.displayCurrentScore();
	},

	this.resumeMatch = function() {
		this.buildScoreCardUI();
		this.displayCurrentScore();
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
			this.scorecard[i] = new Hole(parseInt(holes[i].hole_number), parseInt(holes[i].par));
		};
	}

	this.loadNextHole = function(holeNumber) {
		this.getPlayerRow().querySelectorAll('.hole-score')[0].innerHTML = this.scorecard[holeNumber - 1].score;
	}

	this.calcCurrentScore = function() {
		var par = 0;
		var score = 0;
		for (var i = 0; i < this.scorecard.length; i++) {
			par += parseInt(this.scorecard[i].par);
			score += parseInt(this.scorecard[i].score);
		};

		for (var id in this.scorecard) {
			par += parseInt(this.scorecard[id].par);
			score += parseInt(this.scorecard[id].score);
		}
		this.score = score - par;
	}

	this.displayCurrentScore = function() {
		var sign = (this.score > 0) ? "+" : "";
		this.getPlayerRow().querySelectorAll('.current-score')[0].innerHTML = (!this.score) ? "( E )" : "( " + sign + this.score + " )";
	}

	this.getPlayerRow = function() {
		var playerRows = document.querySelectorAll('.player');

		for (var i = 0; i < playerRows.length; i++) {
			if (playerRows[i].querySelectorAll('.player-id')[0].value == this.id) {
				return playerRows[i];
			}
		};
	}

	this.setHoleScore = function(holeNumber, bIncrement) {
		for (var id in this.scorecard) {
			if (this.scorecard[id].number == holeNumber) {
				if (this.scorecard[id].score > 1 || bIncrement) {
					if (bIncrement) {
						this.scorecard[id].score++;
					} else {
						this.scorecard[id].score--;

					}

					this.calcCurrentScore();
					this.displayCurrentScore();
					this.getPlayerRow().querySelectorAll('.hole-score')[0].innerHTML = this.scorecard[id].score;

				}
				break;
			}
		}
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
