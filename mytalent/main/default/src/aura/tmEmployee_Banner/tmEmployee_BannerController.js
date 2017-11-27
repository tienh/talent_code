({
    init: function(component, event, helper) {
        component.set("v.emp", 
            {
                lastname: "中川",
                firstname: "裕美子",
                display_name: "（栗林）",
                job_category: "Director",
                position: "ADV-B",
                status: "在職中",
                ffs: "BDE（1234）",
            }
        );
        
        //debugger; // the JS debugger will pause here
        //component.set("v.recordId", event.getParam("recordId"));
        var id = helper.getParameterByName(component , event, 'recordId');
        if (id != null) {
            component.set("v.recordId", id);
        } 
        helper.getInfo(component);
    },
    
	myAction : function(component, event, helper) {
		
	}
})