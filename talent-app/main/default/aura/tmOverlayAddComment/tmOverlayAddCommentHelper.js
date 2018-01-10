({
    ToggleHelper : function(component,event) {
    	$A.util.toggleClass(component.find("addComment"), "toggle");
   	},
    
    ToggleSpinnerHelper: function(component, event, helper) {
        component.getEvent("toggleSpinner").fire();
    },
    
    ClearValueHelper: function(component, event) {
        if (component.get("v.editMode") == 1) {
            component.set("v.value", "");
            component.set("v.selectedOptionPills", []);
            component.set("v.comment", "");
            component.set("v.errorMessage", {});
        }
        else {
            this.GetItemHelper(component, event);
        }
        component.set("v.errorMessage", {});
        
        $(component.find("divPicklist").getElement()).children().remove();
        $A.createComponent(
            "c:tmTagPicklist",
            {
                "aura:id":"tagPicklist",
                "selectedOptionPills": component.getReference("v.selectedOptionPills"),
                "value": component.getReference("v.value")
            },
            function(newComponent , status, errorMessage) {
                if (status === "SUCCESS") {
                    var parent = component.find("divPicklist");
                    var body = parent.get("v.body");
                    body.push(newComponent);
                    parent.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                    else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                    }
            }
        );
  	},
    
    GetItemHelper: function(component, event) {
        var action = null;
        switch(component.get("v.tabId")) {
            case "tab-scoped-1":
                action = component.get("c.getSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.getPersonalityComment");
                break;
        }
        action.setParams({
            'itemId': component.get("v.itemId")
        });
       
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var item = response.getReturnValue();
                var selectedValues = [];
                var selectedOptionPills = [];
                (component.get("v.tabId") == 'tab-scoped-1' ? item[0].Skill_Comments__r : item[0].Personality_Comments__r).forEach(function(tag) {
                    var objTag = {
                    	'value': tag.Tag_ID__r.Id,
                       	'label': tag.Tag_ID__r.Name,
                        'iconName': '',
                        'destroyable': true
                    };
                    selectedOptionPills.push(objTag);
                    selectedValues.push(tag.Tag_ID__r.Id);
                });
                component.set("v.selectedOptionPills", selectedOptionPills);
                component.set("v.value", selectedValues.join(";"));
                component.set("v.comment", item[0].Name);
            }
        });
        
        $A.enqueueAction(action);
    },
    
   AddHelper: function(component, event) {
       this.ToggleSpinnerHelper(component, event);
       
        var action = null;
        switch(component.get("v.tabId")) {
            case "tab-scoped-1":
                action = component.get("c.addSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.addPersonalityComment");
                break;
        }
        action.setParams({
            'createById': JSON.parse(window.localStorage.getItem('UserInfo')).Id,
            'employeeId': component.get("v.recordId"),
            'typeId': component.get("v.typeId"),
            'modeId': component.get("v.modeId"),
            'selectedTagsId': component.get("v.selectedOptionPills").map(function(obj){ return obj.value; }).join(";"),
            'comment': component.get("v.comment")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = response.getReturnValue()[0];
                if (message.status == "OK") {
                    var currentYear = component.get("v.currentYear");
                    if (component.get("v.result").length == 0) {
                        var result = [];
                    	result.push({ year: currentYear, comments: response.getReturnValue()[1][currentYear] });
                        component.set("v.result", result);
                    }
                    else {
                  		component.get("v.result").filter(x => x.year === currentYear)[0].comments = response.getReturnValue()[1][currentYear].concat(component.get("v.result").filter(x => x.year === currentYear)[0].comments);
                        component.set("v.result", component.get("v.result"));
                    }
                    
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
    
    EditHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = null;
        switch(component.get("v.tabId")) {
            case "tab-scoped-1":
                action = component.get("c.editSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.editPersonalityComment");
                break;
        }
        action.setParams({
            'itemId': component.get("v.itemId"),
            'selectedTagsId': component.get("v.selectedOptionPills").map(function(obj){ return obj.value; }).join(";"),
            'comment': component.get("v.comment")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = response.getReturnValue()[0];
                if (message.status == "OK") {
                    for (var year in response.getReturnValue()[1]) {
                        component.get("v.result").filter(x => x.year === year)[0].comments = component.get("v.result").filter(x => x.year === year)[0].comments.map(obj => response.getReturnValue()[1][year].find(o => o.Id === obj.Id) || obj);
                     }
                    component.set("v.result", component.get("v.result"));
                    
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
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
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
        
        var action = null;
        switch(component.get("v.tabId")) {
            case "tab-scoped-1":
                action = component.get("c.deleteSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.deletePersonalityComment");
                break;
        }
        action.setParams({
            'itemId': component.get("v.itemId")
        });
       
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = response.getReturnValue()[0];
                if (message.status == "OK") {
                   component.get("v.result").filter(function(item) {
                         item.comments = item.comments.filter(function(obj) {
                             return obj.Id !== component.get("v.itemId");
                         });
                    });
                    component.set("v.result", component.get("v.result"));
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
        if(component.get("v.selectedOptionPills").length == 0) {
            errorMessage.tag_error = "タグを最小１つ選んでください。";
            isValid = false;
        }
        if(!component.get("v.comment") || component.get("v.comment") == '') {
            errorMessage.comment_error ="コメントを入力してください。";
            isValid = false;
        }
        component.set("v.errorMessage", errorMessage);
        return isValid;
    }
})