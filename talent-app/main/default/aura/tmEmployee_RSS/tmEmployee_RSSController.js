({
	init: function(component, event, helper) {
        // display loading spinner
        component.set("v.Spinner", true); 
        
        helper.CountSkillHelper(component, event);
        helper.FetchSkillTypeDataHelper(component, event);
        helper.FetchSkillLevelDataHelper(component, event);
        //helper.FetchProjectDataHelper(component, event);
        helper.FetchEmpSkillsDataHelper(component, event);
        helper.FetchPJSkillsDataHelper(component, event);
    },
    
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
    },
    
})