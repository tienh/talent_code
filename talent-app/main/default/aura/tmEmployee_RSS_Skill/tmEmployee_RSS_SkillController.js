({
	init: function(component, event, helper) {
        //Assign class
        var eType = component.get("v.typeOrder");
        switch (eType) {
            case 1:
                component.set("v.cssClass", "btn_blue");
                break;
            case 2:
                component.set("v.cssClass", "btn_pink");
                break;
            case 3:
                component.set("v.cssClass", "btn_green");
                break;
            default:
                break;
        }
        
        helper.FetchDataHelper(component, event);
    },

})