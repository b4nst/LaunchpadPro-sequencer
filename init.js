var _api;

function bang()
{
	_api = new LiveAPI(apiCallback);
	if(!_api){
		post("no api object\n");
    	return;
	}
	else{
		var lp_pro_found = false;
		var nbSurfaces = _api.getcount("control_surfaces");

		for(i=0; i< nbSurfaces; i++){
				_api.goto("control_surfaces " + i.toString());
				if(_api.type == "Launchpad_Pro"){
					post("Launchpad Pro found.");
					lp_pro_found = i.toString();
					break;
				}				
		}
		if(!lp_pro_found){
			post("Couldn't find Launchpad Pro");
		}
		_api.goto("control_surfaces " + lp_pro_found + " components 105");
		_api.property = "selected_mode";
	}
	outlet(0,"init");
	post(Object.getOwnPropertyNames(_api).filter(function(property){return typeof _api[property] == 'function'}));
}

function apiCallback(args)
{
	if(args[0] != "selected_mode")
		return;
		
	if(args[1] == "user_mode"){
		outlet(0,"focus");
	}
}
