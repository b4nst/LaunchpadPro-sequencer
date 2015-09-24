outlets=2;

var _currentClipIndex = -1;
var _currentNote = 36;
var _velocityLock = 0;

var _stepMatch = { 24:52, 25:53, 26:54, 27:55, 16:56, 17:57, 18:58, 19:59, 8:60, 9:61, 10:62, 11:63, 0:64, 1:65, 2:66, 3:67, 4:96, 5:97, 6:98, 7:99, 12:92, 13:93, 14:94, 15:95, 20:88, 21:89, 22:90, 23:91, 28:84, 29:85, 30:86, 31:87 }; 
var _colors = { "off":0, "green":24 , "red":120, "blue1":112, "blue2":1, "blue3":2, "blue4":3, "blue5":40, "blue6":41, "blue7":67, "blue8":47};
var _blueGradient = [ "blue1", "blue2", "blue3", "blue4", "blue5", "blue6", "blue7", "blue8" ]
var _currentClip = null;

var _currentStepPosition = 0;
var _currentPosition = 0;

var _loopStart = 0;
var _clipLength = 0;
var _divider = 8;
var _oneStep = 0.25;
var _steps = new Array(32);

var _observedTrack = 0;

var _currentLayout = -1;
var _nbLayouts = 1;

	
function clip_change(arg)
{
	_currentClipIndex = arg;
	if(_currentClipIndex == -1){
		delete _currentClip;
		_currentClip = null;
		change_layout(-1);
		return;
	}
	else
	{	
		_currentClip = new LiveAPI(positionCallback, "live_set tracks " + _observedTrack.toString() + " clip_slots " + _currentClipIndex.toString() + " clip");
		_currentClip.property = "playing_position";
		calculateClipLength();
		change_layout(0);
	}	
}

function change_layout(value)
{
	if(value < _nbLayouts){
		_currentLayout = value;		
		outlet(1,"change_current_layout", _currentLayout);
		refresh_seq();
	}
}

function calculateClipLength()
{
	_loopStart = _currentClip.get("loop_start");
	_clipLength = _currentClip.get("loop_end") - _loopStart;
	if(_clipLength > 8 )
	{		
		_nbLayouts = Math.ceil(_clipLength / 8);
		outlet(1,"change_nb_layout",_nbLayouts);
		_clipLength = 8.0;
	}
	_divider = 32/_clipLength;
	_oneStep = 1/_divider;
}

function set_track(arg)
{
	_observedTrack = arg
}

function note_change(arg)
{	
	_currentNote = arg;
	refresh_seq();
}

function initSteps()
{
	_steps.length = 0;
	_steps.length = 32;
	setOff();
}

function velocity_lock(arg)
{
	_velocityLock = arg;
}

function positionCallback(args)
{
	if(args[0] != "playing_position" || _currentClip == null || _currentClip.get("is_playing") == 0)
		return;
		
	//Reset previous pad
	if(_steps[_currentStepPosition]){
		setColor(_currentStepPosition, _blueGradient[parseInt(_steps[_currentStepPosition]*8/128)]);
	}
	else{
		setColor(_currentStepPosition, "off");
	}
		
	var newStepPosition = parseInt(args[1]*_divider);
	
	if(newStepPosition < (32*(_currentLayout + 1)) && newStepPosition >= 32*_currentLayout){		
		_currentStepPosition = newStepPosition - (_currentLayout*32);
		setColor(_currentStepPosition, "green");
		outlet(1,"playing_layout",_currentLayout);
	}
	else
	{
		outlet(1,"playing_layout",parseInt(newStepPosition/32));
	}
}

function delete_note(note, full)
{
	if(_currentClip == null)
		return;
	
	var from_time = full ? 0 : _currentLayout*8;
    var time_span = full ? _nbLayouts*8 : 8;
    _currentClip.call("remove_notes",from_time,note,time_span,1);
	
	if(note == _currentNote)
		refresh_seq();
}

function refresh_seq()
{
	if(_currentClip == null)
		return;	
		
	initSteps();
	var notes = _currentClip.call("get_notes",_currentLayout*8,_currentNote,_clipLength,1);
	notes.shift(); //remove notes
	var nbNote = notes.shift(); //Get num note
	var step;
	var velocity;
	for(i = 0; i < nbNote; i++){
		step = parseInt(notes[(i*6)+2]*_divider) - _currentLayout*32;
		velocity = notes[(i*6)+4];
		_steps[step] = velocity;
		setColor(step, "blue" + parseInt(velocity*8/128 + 1).toString());
	}
}

function double_clip()
{
	if(_currentClip == null)
		return;
		
	_currentClip.call("duplicate_loop");
	calculateClipLength();
	refresh_seq();
}

function bang()
{
	
}

function list()
{
	if(_currentClip == null){
		setOff();		
		return;
	}
	
	var a = arrayfromargs(arguments);
	
	if(a[1] == 0)
		return; //Release pad doesn't matter
		
	var beatPressed = parseFloat((a[0]/_divider) + (_currentLayout*8));
	
	if(_steps[a[0]])
	{
		//Delete step
		_steps[a[0]] = 0;
		setColor(a[0],"off");
		_currentClip.call("remove_notes",beatPressed,_currentNote,1/_divider,1);
	}
	else
	{
		//Create step
		var velib = _velocityLock ? _velocityLock : a[1];
		_steps[a[0]] = velib;
		setColor(a[0],"blue" + parseInt(velib*8/128 + 1).toString());
		_currentClip.call("set_notes");
		_currentClip.call("notes",1);
		_currentClip.call("note",_currentNote.toString(),beatPressed.toFixed(4).toString(),(1/_divider).toString(),velib.toString(),"0");
		_currentClip.call("done");
	}
}

function setOff()
{
	for(i = 0; i <= 31; i++){
		setColor(i, "off");	
	}
}

function setColor(step, color)
{
	outlet(0, _stepMatch[step], _colors["off"]);
	if(color != "off")
		outlet(0, _stepMatch[step], _colors[color]);
}