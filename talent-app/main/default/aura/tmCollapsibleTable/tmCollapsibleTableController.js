({
    init: function(component, event, helper) {
        helper.FetchSkillDataHelper(component, event);
        helper.FetchSkillLevelDataHelper(component, event);
    },
    
    toggle: function(component, event) {
        var rows = component.get("v.resultSkill");
        rows[event.target.dataset.index].Expanded__c = !rows[event.target.dataset.index].Expanded__c;
        component.set("v.resultSkill", rows);
    }
})