outlets=4;

var _colors = { "off":0, "green":25, "light_green":24 , "red":5 };

function list()
{
	var a = arrayfromargs(arguments);
	if(a[0] < 36 ){
		return;
	}
	else if(a[0] <= 51){
		//[36-51] -> Drums pad
		var full = false;
		if(a[1] > 110)
			full = true;
		if(a[1] > 0)
			outlet(2,"delete_note",a[0],full);
	}
	else if(a[0] <= 67){
		//[52-67] -> Step pad
	}
	else if(a[0] <= 83){
		//[68-83] -> Unused pad
	}
	else if(a[0] <= 99){
		//[84-99] -> Step pad
	}
	else if(a[0] <= 107){
		//[100-107] -> clip selection
		if(a[1] == 0)		
			outlet(1,"delete_clip",a[0]-100);
	}
	else if(a[0] <= 123){
		//[108-123] -> Control
		if(a[0] == 111 && a[1] == 0){
			setColor(111,"light_green");
			outlet(3,0);
		}
			
	}	
}

function setColor(note, color)
{
	outlet(0, note, _colors["off"]);
	if(color != "off")
		outlet(0,note, _colors[color]);
}