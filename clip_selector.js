outlets = 2;

var _list = new Array(8);
var _selected_index = -1;

function bang()
{
	outlet(0,_list);
}

function list()
{
	_list = arrayfromargs(arguments);
	if(_selected_index >= 0){
		if(_list[_selected_index] == 0){
			_selected_index= -1;
		}
		else{
			_list[_selected_index] = 75;
		}
	}
	outlet(0, _list);	
	outlet(1, _selected_index);
}

function sel_clip(clip)
{
	if(_selected_index >= 0)
	{
		_list[_selected_index] = 96;
	}
	_selected_index= clip;
	if(_list[_selected_index] > 0){
		_list[_selected_index] = 75;
		outlet(0,_list);		
		outlet(1, _selected_index);
	}
}