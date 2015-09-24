outlets = 2;

var _track;
var _colors = { "off":0, "orange":96, "green":75, };
var _clipSlots = new Array(8);
var _nbClips = 0;
var _hasClipCallBackArray = [ hasClip_1_CallBack, hasClip_2_CallBack, hasClip_3_CallBack, hasClip_4_CallBack, hasClip_5_CallBack, hasClip_6_CallBack, hasClip_7_CallBack, hasClip_8_CallBack ];
var _selectedClip = 0;

var _observedTrack = 0;

function init()
{
	post("init with observedTrack :", _observedTrack, "\n");
	_track = new LiveAPI(clipSlotCallback, "live_set tracks " + _observedTrack.toString());
	if(!_track){
		post("no api object tracks\n");
	    	return;
	}
	_track.property = "clip_slots";	
}

function focus()
{
	for(i=0; i < _nbClips; i++){
		if(_clipSlots[i].get("has_clip") == 1)
			setColor(i+100, "orange");
	}
	if(_selectedClip != 0)
		setColor(_selectedClip + 99,"green");
}

function delete_clip(clip)
{
	if( _clipSlots[clip] == null)
		return;

	_clipSlots[clip].call("delete_clip");
}

function set_track(arg)
{
	post("Clip Manager set track with ", arg, "\n"); 
	setSelectedClip(0);
	_observedTrack = arg;
	init();
}

function list()
{
	var a = arrayfromargs(arguments);
	if(a[1] == 0)
	{
		post(a[0]);
		if( _clipSlots[a[0]-1] == null)
			return;
		
		//Set old clip to orange
		if(_selectedClip != 0)
			setColor(_selectedClip + 99, "orange");
			
		setSelectedClip(a[0]);
		if(_clipSlots[a[0]-1].get("has_clip") == 0){
			_clipSlots[a[0]-1].call("create_clip",8);
		}
		setColor(_selectedClip + 99, "green");
	}
}

function setSelectedClip(value)
{
	_selectedClip = value;
	outlet(1,"clip_change",value - 1);
}

function processHasClip(clip, state)
{
	if(_selectedClip == clip){
		outlet(1,"refresh_seq");
		if(state == 0)
		{
			setColor(_selectedClip + 99,"off");
			setSelectedClip(0);
		}
		return;
	}
	
	switch(state){
		case 0: 
			setColor(clip+99, "off");
			break;
		case 1:
			setColor(clip+99, "orange");
			break;
	}	
}

function clipSlotCallback(args)
{
	if(args[0] != "clip_slots")
		return;
	
	//Args form is : clip_slots id 1 id 2 id 3 ...
	_nbClips = (args.length -1)/2;
	if(_nbClips > 8)
		_nbClips = 8;
	
	_clipSlots.length = 0;
	_clipSlots.length = 8;
	
	for(i = 0; i< 8; i++){
		if(i <= _nbClips){
			_clipSlots[i] = new LiveAPI(_hasClipCallBackArray[i],"live_set tracks "+ _observedTrack.toString() + " clip_slots " + i.toString());
			_clipSlots[i].property = "has_clip";
		}
		else
		{
			_clipSlots[i] = null;
		}
	}
}

function hasClip_1_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(1, args[1]);
}

function hasClip_2_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(2, args[1]);
}

function hasClip_3_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
	
	processHasClip(3, args[1]);
}

function hasClip_4_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(4, args[1]);
}

function hasClip_5_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(5, args[1]);
}

function hasClip_6_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(6, args[1]);
}

function hasClip_7_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(7, args[1]);
}

function hasClip_8_CallBack(args)
{
	if(args[0] != "has_clip")
		return;
		
	processHasClip(8, args[1]);
}

function setColor(note, color)
{
	outlet(0, note, _colors["off"]);
	if(color != "off")
		outlet(0, note, _colors[color]);
}
