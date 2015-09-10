outlets = 5;

var _stepMatch = { 52:24, 53:25, 54:26, 55:27, 56:16, 57:17, 58:18, 59:19, 60:8, 61:9, 62:10, 63:11, 64:0, 65:1, 66:2, 67:3, 96:4, 97:5, 98:6, 99:7, 92:12, 93:13, 94:14, 95:15, 88:20, 89:21, 90:22, 91:23, 84:28, 85:29, 86:30, 87:31 }; 
var _controlMatch = { 108:"Shift" ,109:"Click" ,110:"Undo" ,111:"Delete" ,112:"Quantise" ,113:"Duplicate" ,114:"Double" ,115:"Record" ,116:"Record_Arm" ,117:"Track_Select" ,118:"Mute" ,119:"Solo" ,120:"Volume" ,121:"Pan" ,122:"Sends" ,123:"Stop_Clip" };

function list()
{
	var a = arrayfromargs(arguments);
	if(a[0] < 36 ){
		return;
	}
	else if(a[0] <= 51){
		//[36-51] -> Drums pad
		outlet(0,a[0],a[1]);
	}
	else if(a[0] <= 67){
		//[52-67] -> Step pad
		outlet(1,_stepMatch[a[0]],a[1]);
	}
	else if(a[0] <= 83){
		//[68-83] -> Unused pad
		outlet(4,a[0],a[1]);
	}
	else if(a[0] <= 99){
		//[84-99] -> Step pad
		outlet(1,_stepMatch[a[0]],a[1]);
	}
	else if(a[0] <= 107){
		//[100-107] -> clip selection
		outlet(2,a[0] - 99,a[1]); 
	}
	else if(a[0] <= 123){
		//[108-123] -> Control		
		outlet(3,_controlMatch[a[0]],a[1]);
	}	
}