function pathFilename(path) {
	var match = /\/([^\/]+)$/.exec(path);
	if (match) {
		return match[1];
	}
}

function getRandomInt(min, max) {
	// via https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Math/random#Examples
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(items) {
	return items[getRandomInt(0, items.length-1)];
}

var xkcd = {
	latest: null,
	last: null,
	cache: {},
	base: 'http://dynamic.xkcd.com/api-0/jsonp/comic/',
	
	get: function(num, success, error) {
		if (num == null) {
			path = '';
		} else if (Number(num)) {
			path = String(num);
		} else {
			error(false);
			return false;
		}
		
		if (num in this.cache) {
			this.last = this.cache[num];
			success(this.cache[num]);
		} else {
			return $.ajax({
				url: this.base+path,
				dataType: 'jsonp',
				success: $.proxy(function(data) {
					this.last = this.cache[num] = data;
					success(data);
				}, this),
				error: error});
		}
	}
};

var xkcdDisplay = TerminalShell.commands['display'] = function(terminal, path) {
	function fail() {
		terminal.print($('<p>').addClass('error').text('display: unable to open image "'+path+'": No such file or directory.'));
		terminal.setWorking(false);
	}
			
	if (path) {
		path = String(path);
		num = Number(path.match(/^\d+/));
		filename = pathFilename(path);
		
		if (num > xkcd.latest.num) {
			terminal.print("Time travel mode not enabled.");
			return;
		}
	} else {
		num = xkcd.last.num;
	}
	
	terminal.setWorking(true);
	xkcd.get(num, function(data) {
		if (!filename || (filename == pathFilename(data.img))) {
			$('<img>')
				.hide()
				.load(function() {
					//terminal.print($('<h3>').text(data.num+": "+data.title));
					$(this).fadeIn();
					
					var comic = $(this);
					if (data.link) {
						comic = $('<a>').attr('href', data.link).append($(this));
					}
					terminal.print(comic);
					
					terminal.setWorking(false);
				})
				.attr({src:"Women-circus-performers.jpg"})
				.addClass('comic');
		} else {
			fail();
		}
	}, fail);
};
var imageDisplay = function(terminal, path) {
    //TODO: FIX THIS!!!
	function fail() {
		terminal.print($('<p>').addClass('error').text('display: unable to open image "'+path+'": No such file or directory.'));
		terminal.setWorking(false);
	}
			
	if (path) {
		path = String(path);
		num = Number(path.match(/^\d+/));
		filename = pathFilename(path);
		
		if (num > xkcd.latest.num) {
			terminal.print("Time travel mode not enabled.");
			return;
		}
	}
	terminal.setWorking(true);
	xkcd.get(num, function(data) {
		if (!filename || (filename == pathFilename(data.img))) {
			$('<img>')
				.hide()
				.load(function() {
					terminal.print($('<h3>').text(data.num+": "+data.title));
					$(this).fadeIn();
					
					var comic = $(this);
					if (data.link) {
						comic = $('<a>').attr('href', data.link).append($(this));
					}
					terminal.print(comic);
					
					terminal.setWorking(false);
				})
				.attr({src:num})
				.addClass('comic');
		} else {
			fail();
		}
	}, fail);
};

TerminalShell.commands['Agnes'] = function(terminal, uname) {
    terminal.setWorking(true);
    terminal.setWorking(false);
    terminal.print('Welcome back to Gallow Green, Agnes');
    //Ask the user for password
    TerminalShell.setQNum(terminal, 0);
};

function linkFile(url) {
	return {type:'dir', enter:function() {
		window.location = url;
	}};
}

Filesystem = {
	'welcome.txt': {type:'file', read:function(terminal) {
		terminal.print($('<h4>').text('Welcome to the unixkcd console.'));
		terminal.print('To navigate the comics, enter "next", "prev", "first", "last", "display", or "random".');
		terminal.print('Use "ls", "cat", and "cd" to navigate the filesystem.');
	}},
	'license.txt': {type:'file', read:function(terminal) {
		terminal.print($('<p>').html('Client-side logic for Wordpress CLI theme :: <a href="http://thrind.xamai.ca/">R. McFarland, 2006, 2007, 2008</a>'));
		terminal.print($('<p>').html('jQuery rewrite and overhaul :: <a href="http://www.chromakode.com/">Chromakode, 2010</a>'));
		terminal.print();
		$.each([
			'This program is free software; you can redistribute it and/or',
			'modify it under the terms of the GNU General Public License',
			'as published by the Free Software Foundation; either version 2',
			'of the License, or (at your option) any later version.',
			'',
			'This program is distributed in the hope that it will be useful,',
			'but WITHOUT ANY WARRANTY; without even the implied warranty of',
			'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the',
			'GNU General Public License for more details.',
			'',
			'You should have received a copy of the GNU General Public License',
			'along with this program; if not, write to the Free Software',
			'Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.'
		], function(num, line) {
			terminal.print(line);
		});
	}}
};

// No peeking!

TerminalShell.commands['macbeth'] = TerminalShell.commands['Macbeth'] = function(terminal) {
    terminal.print('\nERROR hjdkghkldsgdjgkldsaj ERROR asdghkljkjajkjdgklajs ABORT ABORT ABORT ERROR asdghkljkjajkjdgklajs ABORT\nSegmentation fault ahig3ijgekgejf NullPointerException askdhfalwekjhwiejweief asdkjhgwekhwekwejhweklwek  ABORT ABORT\nKeyboard Failure kwehgklsxjwopeigjwhasjdhwejahsdjhfweiohadvjbwekjbaeskjhaweuihawekjd\n(...theatre people can be very superstitious, you know) ');
}; 
TerminalShell.commands['help'] = TerminalShell.commands['hint'] = function(terminal) {
    if(terminal.output.qnum == 0){
        terminal.ask("Together in all things until a point,\nIn lines their separation's 438.\nTheir Humor, doubtless Choler, and their joint\nFates to bloody business escalate.\nIndeed, he has it now, K, C, G, all\nAnd she together with him played most foul.\nWhile owl and raven croak the nights dread call\nWolf gives allarum with her chilling howl\nThe shortest of the cannon, marked by death\nKnock thrice, o you of fire, enter... ");
    } else {
        terminal.print('\nNOTE: It is not possible for one person playing alone to reach the end of this game.  In order to win, you must collaborate.  To learn more and meet collaborators, visit the discussion board at facebook.com/themckittrickhotel\n');
        TerminalShell.setQNum(terminal, TerminalShell.qnum);
    }
}; 
var konamiCount = 0;
$(document).ready(function() {
	Terminal.promptActive = false;
	function noData() {
		Terminal.print($('<p>').addClass('error').text('Unable to load startup data. :-('));
		Terminal.promptActive = true;
	}
	$('#screen').bind('cli-load', function(e) {
		xkcd.get(null, function(data) {
			if (data) {
				xkcd.latest = data;
				$('#screen').one('cli-ready', function(e) {
                    if(TerminalShell.qnum != 0){
					    Terminal.runCommand('cat welcome.txt');
                    }
				});
				Terminal.runCommand('Agnes');//'display '+xkcd.latest.num+'/'+pathFilename(xkcd.latest.img));
			} else {
				noData();
			}
		}, noData);
	});
	
	$(document).konami(function(){
		function shake(elems) {
			elems.css('position', 'relative');
			return window.setInterval(function() {
				elems.css({top:getRandomInt(-3, 3), left:getRandomInt(-3, 3)});
			}, 100);	
		}
		
		if (konamiCount == 0) {
			$('#screen').css('text-transform', 'uppercase');
		} else if (konamiCount == 1) {
			$('#screen').css('text-shadow', 'gray 0 0 2px');
		} else if (konamiCount == 2) {
			$('#screen').css('text-shadow', 'orangered 0 0 10px');
		} else if (konamiCount == 3) {
			shake($('#screen'));
		} else if (konamiCount == 4) {
			$('#screen').css('background', 'url(/unixkcd/over9000.png) center no-repeat');
		}
		
		$('<div>')
			.height('100%').width('100%')
			.css({background:'white', position:'absolute', top:0, left:0})
			.appendTo($('body'))
			.show()
			.fadeOut(1000);
		
		if (Terminal.buffer.substring(Terminal.buffer.length-2) == 'ba') {
			Terminal.buffer = Terminal.buffer.substring(0, Terminal.buffer.length-2);
			Terminal.updateInputDisplay();
		}
		TerminalShell.sudo = true;
		konamiCount += 1;
	});
});
