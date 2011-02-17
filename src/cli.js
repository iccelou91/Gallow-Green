/* 	
 Client-side logic for Wordpress CLI theme
 R. McFarland, 2006, 2007, 2008
 http://thrind.xamai.ca/
 
 jQuery rewrite and overhaul
 Chromakode, 2010
 http://www.chromakode.com/
*/

/**** start from http://snippets.dzone.com/posts/show/701 ****/
// Removes leading whitespaces
function ltrim(value) {
	if (value) {
		var re = /\s*((\S+\s*)*)/;
		return value.replace(re, '$1');
	}
	return '';
}

// Removes ending whitespaces
function rtrim(value) {
	if (value) {
		var re = /((\s*\S+)*)\s*/;
		return value.replace(re, '$1');
	}
	return '';
}

// Removes leading and ending whitespaces
function trim(value) {
	if (value) {
		return ltrim(rtrim(value));
	}
	return '';
} /**** end from http://snippets.dzone.com/posts/show/701 ****/

function entityEncode(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/  /g, ' &nbsp;');
	if (/msie/i.test(navigator.userAgent)) {
		str = str.replace('\n', '&nbsp;<br />');
	} else {
		str = str.replace(/\x0D/g, '&nbsp;<br />');
	}
	return str;
}

var TerminalShell = {
    //crypto: sjcl,
    question: q1,
	commands: {
		help: function help(terminal) {
			terminal.print($('<h3>help</h3>'));
			cmd_list = $('<ul>');
			$.each(this.commands, function(name, func) {
				cmd_list.append($('<li>').text(name));
			});
			terminal.print(cmd_list);
		}, 
		clear: function(terminal) {
			terminal.clear();
		}
	},
	filters: [],
	fallback: null,
	qnum: 0,
	lastCommand: null,
    passguesses: 0,
    lastpass: null,
    windows: false,
    setQNum: function(terminal, num){
        if(num>1)terminal.print('To access this question at anytime, login with the password: '+this.lastpass);
        switch(num){
            case 0:        
                terminal.config.prompt = 'Please enter your password (or type "help" for assistance): ';
                terminal.updateInputDisplay();
                break;
            case 1:
                terminal.print("\n\nWelcome, Agnes.  Let us begin.\nNOTE: It is not possible for one person playing alone to reach the end of this game.  In order to win, you must collaborate.  To learn more and meet collaborators, visit the discussion board at facebook.com/themckittrickhotel\n");
                terminal.ask(sjcl.decrypt(this.lastpass, q1));
                break;
            case 2:
                terminal.ask(sjcl.decrypt(this.lastpass, q2));
                break;
            case 3:
                terminal.ask(sjcl.decrypt(this.lastpass, q3));
                break;
            case 4:
                terminal.ask(sjcl.decrypt(this.lastpass, q4));
                break;
            case 5:
                terminal.ask(sjcl.decrypt(this.lastpass, q5));
                break;
            case 6:
                terminal.ask(sjcl.decrypt(this.lastpass, q6));
                //temp
                //terminal.ask(sjcl.decrypt(this.lastpass, q6));
                break;
            case 7:
                //TODO: IMAGES!!!
                this.windows = true;
                ref1 = window.open('Dance_marathon,_1923.jpeg','1',toolbar=0,resizable=0);
                ref2 = window.open('20100802194334_20100201-dsc_0077.jpeg','2',toolbar=0,resizable=0);
                ref3 = window.open('Women-circus-performers.jpg','3',toolbar=0,resizable=0);
                ref4 = window.open('VA-Stafford-house-fire-Aquia-743560.jpeg','4',toolbar=0,resizable=0);
                terminal.ask(sjcl.decrypt(this.lastpass, q7));
                break;
            case 8:
                terminal.ask(sjcl.decrypt(this.lastpass, q8));
                if(this.windows == true){
                    ref1.close();
                    ref2.close();
                    ref3.close();
                    ref4.close();
                }
                break;
            default:
                terminal.print('An internal error occured: Invalid question number, '+num);
			    terminal.setActive(false);
                return;
        }
        this.qnum = num;
    },
	process: function(terminal, cmd) {
		try {
			$.each(this.filters, $.proxy(function(index, filter) {
				cmd = filter.call(this, terminal, cmd);
			}, this));
			var cmd_args = cmd.split(' ');
			var cmd_name = cmd_args.shift();
			cmd_args.unshift(terminal);
			if (this.commands.hasOwnProperty(cmd_name)) {
				this.commands[cmd_name].apply(this, cmd_args);
			} else {
				if (!(this.fallback && this.fallback(terminal, cmd))) {
					this.processAnswer(terminal, cmd);
				}
			}
			this.lastCommand = cmd;
		} catch (e) {
			terminal.print($('<p>').addClass('error').text('An internal error occured: '+e));
			terminal.setWorking(false);
		}
	},
    processAnswer: function(terminal, cmd) {
		try {
            cmd = cmd.toLowerCase();
			$.each(this.filters, $.proxy(function(index, filter) {
				cmd = filter.call(this, terminal, cmd);
			}, this));
			var cmd_args = cmd.split(' ');
			var cmd_name = cmd_args.shift();
			cmd_args.unshift(terminal);
            hash = sjcl.hash.sha256.hash(cmd);
			switch (this.qnum) {
				case 0:
                    this.lastpass=cmd;
                    if (hash == '-1380694512,772870156,826085315,627435450,1738891893,-1592214323,228074972,-2098506451'){
                        this.setQNum(terminal, 1);
                        break;
                    } else if (hash == '-70587409,-879599577,392953757,1726113445,232865862,141803433,-609872297,396831459') {
                        this.setQNum(terminal, 2);
                        break;
                    } else if (hash == '-1595310232,1579830893,-98357775,-850403390,-194994366,-182879862,-332298892,162918651') {
                        this.setQNum(terminal, 3);
                        break;
                    }  else if (hash == '388019647,375188450,1853212355,-1834608102,-315034834,1156056773,46960777,1341101053') {
                        this.setQNum(terminal, 4);
                        break;
                    }   else if (hash == '1559746540,481673761,-1742788752,1375205418,-2099161675,1014410139,1870003689,1679781792') {
                        this.setQNum(terminal, 5);
                        break;
                    }   else if (hash == '-908001040,558511755,-979807413,-1658484874,-1716803782,-616855919,-234742295,-304113975') {
                        this.setQNum(terminal, 6);
                        break;
                    }  else if (hash == '1071357060,812471907,-797062676,-1893871467,1502582017,-1933917803,-15226864,-1735964518') {
                        this.setQNum(terminal, 7);
                        break;
                    }  else if (hash =='1230116172,927077347,1343823835,-591720576,1518241446,-1209604033,-1743596002,1254135814') {
                        this.setQNum(terminal, 8);
                        break;
                    } 
                case 1:
                    if (sjcl.hash.sha256.hash(cmd) == '-1303086432,1843725255,-1122572738,-213369214,1713530668,218483210,1977457022,350163715'){
                        this.lastpass=sjcl.decrypt(cmd, p1);
                        terminal.print('Excellent... Now:');
                        this.setQNum(terminal, 2);
                        break;
                    }
                case 2:
                    if (sjcl.hash.sha256.hash(cmd) == '1837458632,-1008254261,-845708516,-1356477851,1643387068,1322507357,124283633,-975206284'){
                        this.lastpass=sjcl.decrypt(cmd, p2);   
                        this.setQNum(terminal, 3);
                        break;
                    }
                case 3:
                    if (sjcl.hash.sha256.hash(cmd) =='-1102321804,-9623405,-1415880640,1130377918,-1263959596,-404679181,372283979,1364590531'){
                        this.lastpass=sjcl.decrypt(cmd, p3);   
                        this.setQNum(terminal, 4);
                        break;
                    }
                case 4:
                    if (sjcl.hash.sha256.hash(cmd) =='-810401553,-1469641730,1551292512,-1379669891,894820336,-1182282000,733791306,-1618942417'){
                        this.lastpass=sjcl.decrypt(cmd, p4);
                        terminal.print('Excellent... Now:');
                        this.setQNum(terminal, 5);
                        break;
                    }
                case 5:
                    if (sjcl.hash.sha256.hash(cmd) == '118525524,-533702471,-65144244,-1752207976,1995656083,-1946440512,-1817796027,1822389465'){
                        this.lastpass=sjcl.decrypt(cmd, p5);   
                        this.setQNum(terminal, 6);
                        break;
                    }
                case 6:
                    if (sjcl.hash.sha256.hash(cmd) == '1613737560,257450923,-80625867,1844248007,1005658698,1655361387,1210711970,-605715568'){
                        //this.lastpass=sjcl.decrypt(cmd, p6);   
                        //this.setQNum(terminal, 7);
                        break;
                    }
                case 7:
                    if (sjcl.hash.sha256.hash(cmd) == '-912399460,-387048486,1410117229,37426430,-1978209482,-1512845041,744288395,49235581'){
                        this.lastpass=sjcl.decrypt(cmd, p7);
                        terminal.print('Excellent... Now:');
                        this.setQNum(terminal, 8);
                        break;
                    }
                case 8:
                    if (sjcl.hash.sha256.hash(cmd) == '-1915820160,-717486563,1253389329,1275568156,1104544379,-814542719,1424648995,-835934774'){   
                        terminal.finalize(sjcl.decrypt(cmd, p8));
                        break;
                    }
			    default:
				    if (!(this.fallback && this.fallback(terminal, cmd))) {
					    terminal.print('Unrecognized command or answer. Type "help" for assistance.');
				    }
			}
			this.lastCommand = cmd;
		} catch (e) {
			terminal.print($('<p>').addClass('error').text('An internal error occured: '+e));
			terminal.setWorking(false);
		}
	}
};

var Terminal = {
	buffer: '',
	pos: 0,
	history: [],
	historyPos: 0,
	promptActive: true,
	cursorBlinkState: true,
	_cursorBlinkTimeout: null,
	spinnerIndex: 0,
	_spinnerTimeout: null,
	isAsking: false,
	output: TerminalShell,
	
	config: {
		scrollStep:			20,
		scrollSpeed:		100,
		bg_color:			'#000',
		fg_color:			'#FFF',
		cursor_blink_time:	700,
		cursor_style:		'block',
		prompt:				'Username: ',
		spinnerCharacters:	['[   ]','[.  ]','[.. ]','[...]'],
		spinnerSpeed:		250,
		typingSpeed:		90
	},
	
	sticky: {
		keys: {
			ctrl: false,
			alt: false,
			scroll: false
		},
		
		set: function(key, state) {
			this.keys[key] = state;
			$('#'+key+'-indicator').toggle(this.keys[key]);
		},
		
		toggle: function(key) {
			this.set(key, !this.keys[key]);
		},
		
		reset: function(key) {
			this.set(key, false);
		},
		
		resetAll: function(key) {
			$.each(this.keys, $.proxy(function(name, value) {
				this.reset(name);
			}, this));
		}
	},
	
	init: function() {
		function ifActive(func) {
			return function() {
				if (Terminal.promptActive) {
					func.apply(this, arguments);
				}
			};
		}
		
		$(document)
			.keypress($.proxy(ifActive(function(e) {	
				if (e.which >= 32 && e.which <= 126) {   
					var character = String.fromCharCode(e.which);
					var letter = character.toLowerCase();
				} else {
					return;
				}
				
				if ($.browser.opera && !(/[\w\s]/.test(character))) {
					return; // sigh.
				}
				
				if (this.sticky.keys.ctrl) {
					if (letter == 'w') {
						this.deleteWord();
					} else if (letter == 'h') {
						Terminal.deleteCharacter(false);
					} else if (letter == 'l') {
						this.clear();
					} else if (letter == 'a') {
						this.setPos(0);
					} else if (letter == 'e') {
						this.setPos(this.buffer.length);
					} else if (letter == 'd') {
						this.runCommand('logout');
					}
				} else {
					if (character) {
						this.addCharacter(character);
						e.preventDefault();
					}
				}
			}), this))
			.bind('keydown', 'return', ifActive(function(e) { Terminal.processInputBuffer(); }))
			.bind('keydown', 'backspace', ifActive(function(e) { e.preventDefault();	Terminal.deleteCharacter(e.shiftKey); }))
			.bind('keydown', 'del', ifActive(function(e) { Terminal.deleteCharacter(true); }))
			.bind('keydown', 'left', ifActive(function(e) { Terminal.moveCursor(-1); }))
			.bind('keydown', 'right', ifActive(function(e) { Terminal.moveCursor(1); }))
			.bind('keydown', 'up', ifActive(function(e) {
				e.preventDefault();
				if (e.shiftKey || Terminal.sticky.keys.scroll) {
					Terminal.scrollLine(-1);
				} else if (e.ctrlKey || Terminal.sticky.keys.ctrl) {
					Terminal.scrollPage(-1);
				} else {
					Terminal.moveHistory(-1);
				}
			}))
			.bind('keydown', 'down', ifActive(function(e) {
				e.preventDefault();
				if (e.shiftKey || Terminal.sticky.keys.scroll) {
					Terminal.scrollLine(1);
				} else if (e.ctrlKey || Terminal.sticky.keys.ctrl) {
					Terminal.scrollPage(1);
				} else {
					Terminal.moveHistory(1);
				}
			}))
			.bind('keydown', 'pageup', ifActive(function(e) { Terminal.scrollPage(-1); }))
			.bind('keydown', 'pagedown', ifActive(function(e) { Terminal.scrollPage(1); }))
			.bind('keydown', 'home', ifActive(function(e) {
				e.preventDefault();
				if (e.ctrlKey || Terminal.sticky.keys.ctrl) {
					Terminal.jumpToTop();
				} else {
					Terminal.setPos(0);
				}
			}))
			.bind('keydown', 'end', ifActive(function(e) {
				e.preventDefault();
				if (e.ctrlKey || Terminal.sticky.keys.ctrl) {
					Terminal.jumpToBottom();
				} else {
					Terminal.setPos(Terminal.buffer.length);
				}
			}))
			.bind('keydown', 'tab', function(e) {
				e.preventDefault();
			})
			.keyup(function(e) {
				var keyName = $.hotkeys.specialKeys[e.which];
				if (keyName in {'ctrl':true, 'alt':true, 'scroll':true}) {
					Terminal.sticky.toggle(keyName);
				} else if (!(keyName in {'left':true, 'right':true, 'up':true, 'down':true})) {
					Terminal.sticky.resetAll();
				}
			});
		
		$(window).resize(function(e) { $('#screen').scrollTop($('#screen').attr('scrollHeight')); });

		this.setCursorState(true);
		this.setWorking(false);
		$('#prompt').html(this.config.prompt);
		$('#screen').hide().fadeIn('fast', function() {
			$('#screen').triggerHandler('cli-load');
		});
	},
	
	setCursorState: function(state, fromTimeout) {
		this.cursorBlinkState = state;
		if (this.config.cursor_style == 'block') {
			if (state) {
				$('#cursor').css({color:this.config.bg_color, backgroundColor:this.config.fg_color});
			} else {
				$('#cursor').css({color:this.config.fg_color, background:'none'});
			}
		} else {
			if (state) {
				$('#cursor').css('textDecoration', 'underline');
			} else {
				$('#cursor').css('textDecoration', 'none');
			}
		}
		
		// (Re)schedule next blink.
		if (!fromTimeout && this._cursorBlinkTimeout) {
			window.clearTimeout(this._cursorBlinkTimeout);
			this._cursorBlinkTimeout = null;
		}
		this._cursorBlinkTimeout = window.setTimeout($.proxy(function() {
			this.setCursorState(!this.cursorBlinkState, true);
		},this), this.config.cursor_blink_time);
	},
	
	updateInputDisplay: function() {
		var left = '', underCursor = ' ', right = '';

		if (this.pos < 0) {
			this.pos = 0;
		}
		if (this.pos > this.buffer.length) {
			this.pos = this.buffer.length;
		}
		if (this.pos > 0) {
			left = this.buffer.substr(0, this.pos);
		}
		if (this.pos < this.buffer.length) {
			underCursor = this.buffer.substr(this.pos, 1);
		}
		if (this.buffer.length - this.pos > 1) {
			right = this.buffer.substr(this.pos + 1, this.buffer.length - this.pos - 1);
		}

		$('#lcommand').text(left);
		$('#cursor').text(underCursor);
		if (underCursor == ' ') {
			$('#cursor').html('&nbsp;');
		}
		$('#rcommand').text(right);
		$('#prompt').text(this.config.prompt);
		return;
	},
	
	clearInputBuffer: function() {
		this.buffer = '';
		this.pos = 0;
		this.updateInputDisplay();
	},
	
	clear: function() {
		$('#display').html('');
	},
	
	addCharacter: function(character) {
		var left = this.buffer.substr(0, this.pos);
		var right = this.buffer.substr(this.pos, this.buffer.length - this.pos);
		this.buffer = left + character + right;
		this.pos++;
		this.updateInputDisplay();
		this.setCursorState(true);
	},
	
	deleteCharacter: function(forward) {
		var offset = forward ? 1 : 0;
		if (this.pos >= (1 - offset)) {
			var left = this.buffer.substr(0, this.pos - 1 + offset);
			var right = this.buffer.substr(this.pos + offset, this.buffer.length - this.pos - offset);
			this.buffer = left + right;
			this.pos -= 1 - offset;
			this.updateInputDisplay();
		}
		this.setCursorState(true);
	},
	
	deleteWord: function() {
		if (this.pos > 0) {
			var ncp = this.pos;
			while (ncp > 0 && this.buffer.charAt(ncp) !== ' ') {
				ncp--;
			}
			left = this.buffer.substr(0, ncp - 1);
			right = this.buffer.substr(ncp, this.buffer.length - this.pos);
			this.buffer = left + right;
			this.pos = ncp;
			this.updateInputDisplay();
		}
		this.setCursorState(true);
	},
	
	moveCursor: function(val) {
		this.setPos(this.pos + val);
	},
	
	setPos: function(pos) {
		if ((pos >= 0) && (pos <= this.buffer.length)) {
			this.pos = pos;
			Terminal.updateInputDisplay();
		}
		this.setCursorState(true);
	},
	
	moveHistory: function(val) {
		var newpos = this.historyPos + val;
		if ((newpos >= 0) && (newpos <= this.history.length)) {
			if (newpos == this.history.length) {
				this.clearInputBuffer();
			} else {
				this.buffer = this.history[newpos];
			}
			this.pos = this.buffer.length;
			this.historyPos = newpos;
			this.updateInputDisplay();
			this.jumpToBottom();
		}
		this.setCursorState(true);
	},
	
	addHistory: function(cmd) {
		this.historyPos = this.history.push(cmd);
	},

	jumpToBottom: function() {
		$('#screen').animate({scrollTop: $('#screen').attr('scrollHeight')}, this.config.scrollSpeed, 'linear');
	},

	jumpToTop: function() {
		$('#screen').animate({scrollTop: 0}, this.config.scrollSpeed, 'linear');
	},
	
	scrollPage: function(num) {
		$('#screen').animate({scrollTop: $('#screen').scrollTop() + num * ($('#screen').height() * .75)}, this.config.scrollSpeed, 'linear');
	},

	scrollLine: function(num) {
		$('#screen').scrollTop($('#screen').scrollTop() + num * this.config.scrollStep);
	},

	print: function(text) {
		if (!text) {
			$('#display').append($('<div>'));
		} else if( text instanceof jQuery ) {
			$('#display').append(text);
		} else {
			var av = Array.prototype.slice.call(arguments, 0);
			$('#display').append($('<p>').text(av.join(' ')));
		}
		this.jumpToBottom();
	},
	
	processInputBuffer: function(cmd) {
        if(this.isAsking==true){
            return;
        }
		this.print($('<p>').addClass('command').text(this.config.prompt + this.buffer));
		var cmd = trim(this.buffer);
		this.clearInputBuffer();
		if (cmd.length == 0) {
			return false;
		}
		this.addHistory(cmd);
		if (this.output) {
			return this.output.process(this, cmd);
		} else {
			return false;
		}
	},
	
	setPromptActive: function(active) {
		this.promptActive = active;
		$('#inputline').toggle(this.promptActive);
	},
	setAsking: function(arg) {
		this.isAsking = arg;
	},
	setWorking: function(working) {
		if (working && !this._spinnerTimeout) {
			$('#display .command:last-child').add('#bottomline').first().append($('#spinner'));
			this._spinnerTimeout = window.setInterval($.proxy(function() {
				if (!$('#spinner').is(':visible')) {
					$('#spinner').fadeIn();
				}
				this.spinnerIndex = (this.spinnerIndex + 1) % this.config.spinnerCharacters.length;
				$('#spinner').text(this.config.spinnerCharacters[this.spinnerIndex]);
			},this), this.config.spinnerSpeed);
			this.setPromptActive(false);
			$('#screen').triggerHandler('cli-busy');
		} else if (!working && this._spinnerTimeout) {
			clearInterval(this._spinnerTimeout);
			this._spinnerTimeout = null;
			$('#spinner').fadeOut();
			this.setPromptActive(true);
			$('#screen').triggerHandler('cli-ready');
		}
	},
	
	runCommand: function(text) {
		var index = 0;
		var mine = false;
		
		this.promptActive = false;
		var interval = window.setInterval($.proxy(function typeCharacter() {
			if (index < text.length) {
				this.addCharacter(text.charAt(index));
				index += 1;
			} else {
				clearInterval(interval);
				this.promptActive = true;
				this.processInputBuffer();
			}
		}, this), this.config.typingSpeed);
	},
	ask: function(text) {
		var index = 0;
		var mine = false;	
		this.promptActive = false;
        this.setAsking(true);
        this.config.prompt = '';
        this.updateInputDisplay();
        this.runCommand('');
        text = '\n'+text+'\n';
		var interval = window.setInterval($.proxy(function typeCharacter() {
			if (index < text.length) {
				this.addCharacter(text.charAt(index));
                if(text.charAt(index)=='\n'){
                    this.scrollLine(1);
                }
				index += 1;
                this.updateInputDisplay();
			} else {
				clearInterval(interval);
				//this.processInputBuffer();
                this.print(text);
                this.clearInputBuffer();
                this.promptActive = true;
                this.setAsking(false);
                this.config.prompt = 'Answer: ';
                this.updateInputDisplay();
			}
		}, this), this.config.typingSpeed);
	},
    finalize: function(text) {
		var index = 0;
		var mine = false;	
		this.promptActive = false;
        this.setAsking(true);
        this.config.prompt = '';
        this.updateInputDisplay();
        this.runCommand('');
        this.config.typingSpeed = 1000;
        text = '\n'+text+'\n';
		var interval = window.setInterval($.proxy(function typeCharacter() {
			if (index < text.length) {
				this.addCharacter(text.charAt(index));
                if(text.charAt(index)=='\n'){
                    this.scrollLine(1);
                }
				index += 1;
                this.updateInputDisplay();
			} else {
				clearInterval(interval);
                this.print(text);
                this.clearInputBuffer();
                this.updateInputDisplay();
                this.setPromptActive(true);
			}
		}, this), this.config.typingSpeed);
	}
};

$(document).ready(function() {
	$('#welcome').show();
	// Kill Opera's backspace keyboard action.
	document.onkeydown = document.onkeypress = function(e) { return $.hotkeys.specialKeys[e.keyCode] != 'backspace'; };
	Terminal.init();
});

