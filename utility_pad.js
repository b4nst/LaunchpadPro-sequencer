outlets = 2;

var _velocityLock = 0;
var _velocityValue;
var _velocityPad = 68;
var _colors = { "off":0, "green":24 , "red1":1, "red2":2, "red3":3, "red4":4, "red5":56, "red6":82, "red7":95, "red8":5 };
var _redGradient = [ "red1", "red2", "red3", "red4", "red5", "red6", "red7", "red8" ];

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