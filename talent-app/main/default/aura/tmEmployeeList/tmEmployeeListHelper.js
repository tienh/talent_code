({
	FetchDataHelper: function(component, event) {
        var action = component.get("c.fetchAll");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.empList", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
})