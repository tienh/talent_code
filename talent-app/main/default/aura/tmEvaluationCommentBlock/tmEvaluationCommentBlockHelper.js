({
    ToggleHelper : function(component,event) {
        var hiddenClass = "slds-assistive-text";
    	$A.util.toggleClass(component.find("commentText"), hiddenClass);
        $A.util.toggleClass(component.find("commentInput"), hiddenClass);
        $A.util.toggleClass(component.find("editButton"), hiddenClass);
        $A.util.toggleClass(component.find("commandButton"), hiddenClass);
   	},
    
    ToggleSpinnerHelper: function(component, event, helper) {
        component.getEvent("toggleSpinner").fire();
    },
    
	EditHelper: function(component, event) {
        component.set("v.comment", component.get("v.item.Name"));
        this.ToggleHelper(component, event);
    },
       
    SaveHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = component.get("c.editEvaluationComment");
        action.setParams({
            'itemId': component.get("v.item.Id"),
            'comment': component.get("v.comment")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = response.getReturnValue()[0];
                if (message.status == "OK") {
                    component.set("v.item.Name", response.getReturnValue()[1][0].Name);
                    
                    toastEvent.setParams({
                        "title": "成功編集済み",
                        "message": message.message ? message.message : ' ',
                        "type": "success"
                    });
                }
                else {
                    toastEvent.setParams({
                        "title": "失敗編集",
                        "message": message.message ? message.message : ' ',
                        "type": "error"
                    });
                }
                toastEvent.fire();
            }
        });
        this.ToggleHelper(component, event);
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
    },
    
    CancelHelper: function(component, event) {
        component.set("v.comment", "");
        component.set("v.errorMessage", {});
        this.ToggleHelper(component, event);
    },
    
    ConfirmDeleteHelper: function(component, event) {
        component.set("v.showModal", true);
        component.set("v.showClose", false);
        component.set("v.title", "削除確認");
        component.set("v.variant", "error");
        component.set("v.content", "このコメントを削除しますか？");
        component.set("v.primaryButtonLabel", "はい");
        component.set("v.secondaryButtonLabel", "いいえ");
    },
    
    DeleteHelper: function(component, event) {
        component.set("v.showModal", false);
        this.ToggleSpinnerHelper(component, event);
        
        var action = component.get("c.deleteEvaluationComment");
        action.setParams({
            'itemId': component.get("v.item.Id")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = response.getReturnValue()[0] ;
                if (message.status == "OK") {
                    component.set("v.item", null);
                    $A.util.toggleClass(component.find("commentRow"), "slds-assistive-text");
                    toastEvent.setParams({
                        "title": "成功削除済み",
                        "message": message.message ? message.message : ' ',
                        "type": "success"
                    });
                }
                else {
                    toastEvent.setParams({
                        "title": "失敗削除",
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
            errorMessage.comment_error ="総合評価コメントを入力してください。";
            isValid = false;
        }
        component.set("v.errorMessage", errorMessage);
        return isValid;
    }
    
})