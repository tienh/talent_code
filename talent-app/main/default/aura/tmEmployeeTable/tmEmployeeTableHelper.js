({
	getEmployees : function(component, page) {
        var action = component.get("c.findAll");
        action.setStorable();
        var pageSize = component.get("v.pageSize");
		action.setParams({
      		"searchKey": component.get("v.searchKey"),
            "pageSize": pageSize,
            "pageNumber": page || 1
    	});
    	action.setCallback(this, function(response) {
            var result = response.getReturnValue();
            console.log('Page %d loaded in %fms', result.page, performance.now() - startTime);
            component.set("v.employees", result.employees);
            component.set("v.page", result.page);
            component.set("v.total", result.total);
            component.set("v.pages", Math.ceil(result.total/pageSize));
    	});
        var startTime = performance.now();
    	$A.enqueueAction(action);
	}
})