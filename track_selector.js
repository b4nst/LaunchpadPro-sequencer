
var _trackSelected;


function msg_int(arg)
{
	_trackSelected = arg;
	track = new LiveAPI("live_set tracks " + _trackSelected.toString());
	
	if(!track)
		return;
				
	if(track.get("has_midi_input") == 1 && track.get("has_audio_output") == 1){
		firstDevice = new LiveAPI("live_set tracks " + _trackSelected.toString() + " devices 0");
		if(firstDevice.get("can_have_drum_pads")==1){
			outlet(0,"set_track",_trackSelected);
		}
	}
}
