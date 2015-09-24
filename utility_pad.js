outlets = 2;

var _velocityLock = 0;
var _velocityValue;
var _velocityPad = 68;
var _colors = { "off":0, "yellow":96, "dark_yellow":11, "green":24 , "dark_green":31, "red1":1, "red2":2, "red3":3, "red4":4, "red5":56, "red6":82, "red7":95, "red8":5 };
var _redGradient = [ "red1", "red2", "red3", "red4", "red5", "red6", "red7", "red8" ];

var _currentLayout = -1;
var _nbLayouts = 0;
var _playingLayout = -1;

function init()
{
	velocityValue = 0;
}

function focus()
{
	for(i=68; i<=83;i++)
		setColor(i,"off");
	if(_velocityValue)
		setColor(_velocityPad,_redGradient[parseInt(_velocityValue*8/128)]);
		
	for(i=0;i<4;i++)
	{
		var color = "off"
		if(i == _currentLayout)
			color = "yellow";
		else if(i < _nbLayouts)
			color = "dark_yellow";
		setColor(i+80,color);
	}
}

function list()
{
	var a = arrayfromargs(arguments);
	if( a[0] == _velocityPad && a[1]!=0 ){
		_velocityValue = a[1];
		setColor(_velocityPad,_redGradient[parseInt(_velocityValue*8/128)]);
		if(_velocityLock){
			outlet(1,"velocity_lock",_velocityValue);
		}
	}
	else if( a[1]==0 && a[0] >= 80 && a[0] <= 83){//pad layout released
		var layout = a[0]-80;
		if(layout < _nbLayouts)
		{
			change_current_layout(layout);
			outlet(1,"change_layout",_currentLayout);
		}
	}
}

function change_current_layout(arg)
{
	//Reset previous layout
	if(_currentLayout != -1){
		if(_currentLayout < _nbLayouts)
			setColor(80+_currentLayout,"dark_yellow");
		else
			setColor(80+_currentLayout,"off");
	}

	_currentLayout = arg;
	if(_currentLayout == -1)
	{
		change_nb_layout(0);
	}
	else
	{
		setColor(_currentLayout+80,"yellow");
	}
}

function playing_layout(arg)
{
	if(_playingLayout != _currentLayout)
		setColor(_playingLayout+80,"dark_yellow");
	else
		setColor(_playingLayout+80,"yellow");
	_playingLayout = arg;
	if(_playingLayout != _currentLayout)
		setColor(_playingLayout+80,"dark_green");
	else
		setColor(_playingLayout+80,"green");
}

function change_nb_layout(arg)
{
	_nbLayouts = arg;
	for(i=0;i<4;i++)
	{
		var color = "off"
		if(i == _currentLayout)
			color = "yellow";
		else if(i < _nbLayouts)
			color = "dark_yellow";
		setColor(i+80,color);
	}
}

function velocity_lock(arg)
{
	_velocityLock = arg;
	if(_velocityLock)
		outlet(1,"velocity_lock",_velocityValue);
	else
		outlet(1,"velocity_lock",0);
}

function setColor(note, color)
{
	outlet(0, note, _colors["off"]);
	if(color != "off")
		outlet(0,note, _colors[color]);
}