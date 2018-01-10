({
    init: function(component, event, helper) {
        //debugger; // the JS debugger will pause here
        helper.getInfo(component);
    },
    
    evaluate: function(component, event, helper) {
       	component.find("evaluationTab").evaluateMethod();
    }
})