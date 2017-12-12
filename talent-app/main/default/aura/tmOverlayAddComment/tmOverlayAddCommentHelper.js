({
    ToggleHelper : function(component,event) {
    	$A.util.toggleClass(component.find("addComment"), "toggle");
   	},
    
    ClearValueHelper: function(component, event) {
        component.set("v.selectedTags", "");
        component.set("v.comment", "");
        component.find("tag").destroy();
        
        $A.createComponent(
            "c:strike_multiSelectPicklist",
            {
                "aura:id": "tag",
                "value": "",
                "placeholder": "タグ",
                "label": "",
            },
            function(newButton, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(newButton);
                    component.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );
  	},
    
    GetTagsHelper: function(component, event) {
        var action = component.get("c.getTags");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.tags", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
   SaveHelper: function(component, event) {
        var action = component.get("c.saveSkillComment");
        action.setParams({
            'createById': JSON.parse(window.localStorage.getItem('UserInfo')).Id,
            'employeeId': component.get("v.recordId"),
            'skillId': component.get("v.skillId"),
            'skillLevelId': component.get("v.skillLevelId"),
            'selectedTagsId': component.get("v.selectedTags"),
            'comment': component.get("v.comment")
        });
       
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            if (state === "SUCCESS") {
                var message = JSON.parse(response.getReturnValue()[0]);
                if (message.status == "OK")
                {
                    component.set("v.skip", (parseInt(component.get("v.skip")) + 1));
                    component.set("v.result", response.getReturnValue()[1].concat(component.get("v.result")));
                    toastEvent.setParams({
                        "title": "成功保存済み",
                        "message": message.message ? message.message : ' ',
                        "type": "success"
                    });
                }
                else
                {
                    toastEvent.setParams({
                        "title": "失敗保存",
                        "message": message.message ? message.message : ' ',
                        "type": "error"
                    });
                }
                toastEvent.fire();
            }
        });
        
        $A.enqueueAction(action);
    }
})