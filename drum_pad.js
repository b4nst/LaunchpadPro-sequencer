outlets = 2;

var _start = 36;
var _end = 51;
var _oldNote;
var _notePressed;

var _colors = { "off":0, "yellow":13, "blue":40, "green":75 };

function init()
{
	_oldNote = _start;
	_notePressed = 0;
}
	
function focus()
{
	for(i=_start; i<= _end; i++)
		setColor(i,"yellow");
	setColor(_oldNote, "blue");
	outlet(1, "note_change", _oldNote);
}

function list()
{
	var a = arrayfromargs(arguments); 
	drumPress( a[0], a[1]);
}

function drumPress(note, velocity)
{
	if(velocity == 0){
		_notePressed --;
		if(_notePressed == 0){
			setColor(_oldNote, "yellow");						
			setColor(note, "blue");
			_oldNote = note;			
			outlet(1, "note_change", note);
		}
		else{
			setColor(note,"yellow");
		}
	}
	else
	{
		setColor(note, "green");
		_notePressed ++;
	}
}

function setColor(note, color)
{
	outlet(0, note, _colors["off"]);
	if(color != "off")
		outlet(0, note, _colors[color]);
}


