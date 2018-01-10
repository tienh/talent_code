({
    ToggleSpinnerHelper : function(component,event) {
    	$A.util.toggleClass(component.find("spinner"), "slds-hide");
   	},
    
    EvaluateHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = component.get("c.evaluateComment");
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'dateFrom': component.get("v.dtFrom") ? component.get("v.dtFrom").replace(/-/g, '/') : null,
            'dateTo': component.get("v.dtTo") ? component.get("v.dtTo").replace(/-/g, '/') : null
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.resultEvaluate", response.getReturnValue());
            }
        });
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
    },
    
    SearchHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = component.get("c.fetchEvaluationComment");
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'dateFrom': component.get("v.dtFrom") ? component.get("v.dtFrom").replace(/-/g, '/') : null,
            'dateTo': component.get("v.dtTo") ? component.get("v.dtTo").replace(/-/g, '/') : null
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.result", response.getReturnValue());
            }
        });
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
    },
    
    ClearValueHelper: function(component, event) {
        component.set("v.comment", "");
        component.set("v.errorMessage", {});
    },
    
    AddHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = component.get("c.addEvaluationComment");
        action.setParams({
            'createById': JSON.parse(window.localStorage.getItem('UserInfo')).Id,
            'employeeId': component.get("v.recordId"),
            'comment': component.get("v.comment")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = response.getReturnValue()[0];
                if (message.status == "OK") {
                    component.set("v.result", response.getReturnValue()[1].concat(component.get("v.result")));
                    toastEvent.setParams({
                        "title": "成功追加済み",
                        "message": message.message ? message.message : ' ',
                        "type": "success"
                    });
                }
                else {
                    toastEvent.setParams({
                        "title": "失敗追加",
                        "message": message.message ? message.message : ' ',
                        "type": "error"
                    });
                }
                toastEvent.fire();
            }
        });
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
    },
    
    ValidationHelper: function(component, event) {
        var errorMessage = {};
        var isValid = true;
        if(!component.get("v.comment") || component.get("v.comment") == '') {
            errorMessage.comment_error ="コメントを入力してください。";
            isValid = false;
        }
        component.set("v.errorMessage", errorMessage);
        return isValid;
    }
})