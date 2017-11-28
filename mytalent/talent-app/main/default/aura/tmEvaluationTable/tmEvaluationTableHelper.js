({
	SearchHelper: function(component, event) {
        var action = component.get("c.searchComment");
        action.setParams({
            'DateFrom': component.get("v.dt_from") ? component.get("v.dt_from").replace(/-/g, '/') : null,
            'DateTo': component.get("v.dt_to") ? component.get("v.dt_to").replace(/-/g, '/') : null
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.searchResult", storeResponse);
            }
        });
        
        $A.enqueueAction(action);
    }
})