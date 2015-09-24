outlets = 4;

var _velocityLock;
var _colors = { "off":0, "green":25, "light_green":24 , "red":5 };

function init()
{
	_velocityLock = false;
}

function focus(){
	if(_velocityLock)
		setColor(120,"red");
	else
		setColor(120,"light_green");
		
	setColor(114,"light_green");
	setColor(111,"light_green");
}

function Shift(arg)
{
}

function Click(arg)
{
}

function Undo(arg)
{
}

function Delete(arg)
{
	if(arg > 0)
	{
		setColor(111,"red");
		outlet(3,1);
	}
}

function Quantise(arg)
{
}

function Duplicate(arg)
{
}

function Double(arg)
{
	if(arg > 0){
		setColor(114,"green");
	}
	else{
		setColor(114,"light_green");
		outlet(2,"double_clip");
	}
}

function Record(arg)
{
}

function Record_Arm(arg)
{
}

function Track_Select(arg)
{
}

function Mute(arg)
{
}

function Solo(arg)
{
}

function Volume(arg)
{
	if(arg == 0){
		_velocityLock = !_velocityLock;
		outlet(1,"velocity_lock",_velocityLock);
		if(_velocityLock)
			setColor(120,"red");
		else
			setColor(120,"light_green");
	}
}

function Pan(arg)
{
}

function Sends(arg)
{
}

function Stop_Clip(arg)
{
}

function setColor(note, color)
{
	outlet(0, note, _colors["off"]);
	if(color != "off")
		outlet(0,note, _colors[color]);
}

