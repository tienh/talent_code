({
	init: function(component, event, helper) {
		var isHasPJ = component.get("v.projectId") != null ? true : false;
        component.set("v.isPJ", isHasPJ);
	},
    
    showModal : function(component,event) {
        // Prevent using by standard user or different owner user
        var userInfo = JSON.parse(window.localStorage.getItem('UserInfo'));
        if (userInfo.Employee_Hiring__r.Permission__r.Name != 'Manager'
            && userInfo.Id != component.get("v.recordId")) {
            return;
        }
        
        // Show update dialog
    	var modal = component.find('skillCRUD');
        modal.set('v.title', component.get("v.typeName"));
        modal.show();
        //debugger; // the JS debugger will pause here
   	},
    
    handleModalShow : function(component, event, helper) {
        helper.BindValueHelper(component, event);
    },
    
    handlePrimaryButtonClick : function(component, event, helper) {
        var modalName = event.getSource().getLocalId();
        component.find(modalName).hide();
        helper.UpdateValueHelper(component, event);
    },
})