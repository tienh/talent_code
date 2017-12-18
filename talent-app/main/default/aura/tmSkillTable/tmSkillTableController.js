({
    init: function(component, event, helper) {
        helper.FetchSkillTypeDataHelper(component, event);
        helper.FetchSkillLevelDataHelper(component, event);
    },
    
    toggle: function(component, event) {
        var rows = component.get("v.resultSkillType");
        rows[event.target.dataset.index].Expanded__c = !rows[event.target.dataset.index].Expanded__c;
        component.set("v.resultSkillType", rows);
    }
})