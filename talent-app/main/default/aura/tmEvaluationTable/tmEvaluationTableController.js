({
    init: function(cmp, evt) {
        var today = new Date();
    },
    
    search: function(component, event, helper) {
        var DateFrom = component.find("dt_from").get("v.value");
        var DateTo = component.find("dt_to").get("v.value");
        helper.SearchHelper(component, event);
    }
})