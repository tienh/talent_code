({
    init: function(component, event, helper) {
    },
    
    search: function(component, event, helper) {
        var DateFrom = component.get("v.dt_from");
        var DateTo = component.get("v.dt_to");
        helper.SearchHelper(component, event);
    }
})