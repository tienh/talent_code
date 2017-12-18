({
    ToggleHelper : function(component,event) {
    	$A.util.toggleClass(component.find("addComment"), "toggle");
   	},
    
    ClearValueHelper: function(component, event) {
        component.set("v.selectedTags", "");
        component.set("v.comment", "");
        component.find("selectedItem");
        
        /*$A.get("e.c:tmDestroyTagPicklistEvt").fire();
        
        $A.createComponent(
            "c:tmTagPicklist",
            {
                "aura:id":"tagPicklist",
                "selectedTags": component.getReference("v.selectedTags")
            },
            function(newComponent , status, errorMessage){
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
        );*/
  	},
    
    GetItemHelper: function(component, event) {
        var action = null;
        switch(component.get("v.tabId"))
        {
            case "tab-scoped-1":
                action = component.get("c.getSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.getPersonalityComment");
                break;
            case "tab-scoped-3":
                action = component.get("c.getEvaluationComment");
                break;
        }
        action.setParams({
            'itemId': component.get("v.itemId")
        });
       
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var item = response.getReturnValue();
                for (var i in component.get("v.tabId")  == 'tab-scoped-1' ? item[0].Skill_Comments__r : item[0].Personality_Comments__r) {
                	var tag = component.get("v.tabId")  == 'tab-scoped-1' ?  item[0].Skill_Comments__r[i] : item[0].Personality_Comments__r[i];
                    console.log(tag.Tag_ID__r.Name);
                    component.set("v.selectedTags", tag.Tag_ID__r.Name);
                }
                console.log(component.set("v.selectedTags"));
                //component.set("v.selectedTags", item[0].Name);
                component.set("v.comment", item[0].Name);
            }
        });
        
        $A.enqueueAction(action);
    },
    
   SaveHelper: function(component, event) {
        var action = null;
        switch(component.get("v.tabId"))
        {
            case "tab-scoped-1":
                action = component.get("c.saveSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.savePersonalityComment");
                break;
            case "tab-scoped-3":
                action = component.get("c.saveEvaluationComment");
                break;
        }
        action.setParams({
            'createById': JSON.parse(window.localStorage.getItem('UserInfo')).Id,
            'employeeId': component.get("v.recordId"),
            'typeId': component.get("v.typeId"),
            'modeId': component.get("v.modeId"),
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