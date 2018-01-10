({
    init: function(component, event, helper) {
        //debugger; // the JS debugger will pause here
        //var id = helper.getParameterByName(component , event, 'recordId');
        //if (id != null) {
        //    component.set("v.recordId", id);
        //}
        helper.getInfo(component);
    },

})