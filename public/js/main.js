/*global App, document, Match, Player, XMLHttpRequest*/
'use strict';
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

	init: function() {
		App.bindEvent('click', '#start_match', Match.startMatch);
		App.bindEvent('click', '#join_match', Match.showExistingMatches);
		App.bindEvent('click', '.mark-match-complete', Match.finishMatch);
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
			// document.querySelectorAll('.active-match-name')[0].innerHTML = data.active_match
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
			// document.querySelectorAll('.active-match-name')[0].innerHTML = data.active_match
			Match.bindPlayerEvents();
		});
	},

	finishMatch: function() {

	},

	bindPlayerEvents: function() {
		App.bindEvent('click', '.home', Match.goHome);
		App.bindEvent('click', '.play', Match.play);
		App.bindEvent('click', '#register-player', Player.register);
		App.bindEvent('click', '.select-player', Player.selectPlayer);
	},

	play: function() {
		App.ajax('play', 'GET', null, function(data) {
			App.setContent(data.html);
		});
	},
}

/**
*
* Player obj will contain all pertant player info (name, id, scores)
*
**/
function Player(name, id) {
	this.name = name;
	this.id = id;
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

Player.selectPlayer = function() {
	var parentDiv = this.parentNode.parentNode;
	var playerId = parentDiv.querySelectorAll('.player-id')[0].value;
	var playerName = parentDiv.querySelectorAll('.player-name')[0].innerHTML;
	var buttonIcon = parentDiv.querySelectorAll('.glyphicon-plus')[0];
	var button = parentDiv.querySelectorAll('.select-player')[0];

	button.removeEventListener('click', Player.selectPlayer);
	button.addEventListener('click', Player.removePlayer);

	App.removeClass(buttonIcon, 'glyphicon-plus');
	App.addClass(buttonIcon, 'glyphicon-minus');

	App.removeClass(button, 'select-player');
	App.addClass(button, 'deselect-player');

	scorecard.push(new Player(playerName, playerId));
}

Player.removePlayer = function() {
	var parentDiv = this.parentNode.parentNode;
	var playerId = parentDiv.querySelectorAll('.player-id')[0].value;
	var buttonIcon = parentDiv.querySelectorAll('.glyphicon-minus')[0];
	var button = parentDiv.querySelectorAll('.deselect-player')[0];

	button.removeEventListener('click', Player.removePlayer);
	button.addEventListener('click', Player.selectPlayer);

	App.removeClass(buttonIcon, 'glyphicon-minus');
	App.addClass(buttonIcon, 'glyphicon-plus');

	App.removeClass(button, 'deselect-player');
	App.addClass(button, 'select-player');

	for (var i = 0; i < scorecard.length; i++) {
		if (scorecard[i].id === playerId) {
			scorecard.splice(i, 1);
		}
	};
}

/**
*
* array to hold player objects
*
**/
var scorecard = [

]

Match.init();
