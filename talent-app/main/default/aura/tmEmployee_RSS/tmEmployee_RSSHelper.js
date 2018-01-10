({
    CountSkillHelper: function(component, event) {
        var action = component.get("c.countSkill");
        action.setParams({ 'employeeId': component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.counter", response.getReturnValue());
                //debugger; // the JS debugger will pause here
            }
        });
        $A.enqueueAction(action);
    },
    
	FetchSkillTypeDataHelper: function(component, event) {
        var action = component.get("c.fetchSkillType");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstSkillType", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    FetchSkillLevelDataHelper: function(component, event) {
        var action = component.get("c.fetchSkillLevel");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstSkillLevel", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    FetchProjectDataHelper: function(component, event) {
        var action = component.get("c.fetchProject");
        action.setParams({ 'employeeId': component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstProject", response.getReturnValue());
                //debugger; // the JS debugger will pause here
            }
        });
        $A.enqueueAction(action);
    },
    
    FetchEmpSkillsDataHelper: function(component, event) {
        var action = component.get("c.getListEmpSkills");
        action.setParams({ 'employeeId': component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstEmpSkills", response.getReturnValue());
                //debugger; // the JS debugger will pause here
            }
        });
        $A.enqueueAction(action);
    },
    
    FetchPJSkillsDataHelper: function(component, event) {
        var action = component.get("c.getListProjectSkills");
        action.setParams({ 'employeeId': component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstPJSkills", response.getReturnValue());
                // hide loading spinner
                component.set("v.Spinner", false);
                //debugger; // the JS debugger will pause here
            }
        });
        $A.enqueueAction(action);
    },
    
})