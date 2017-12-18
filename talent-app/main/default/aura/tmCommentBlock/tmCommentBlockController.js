({
    init: function(component, event, helper) {
        component.set("v.userInfo", JSON.parse(window.localStorage.getItem('UserInfo')));
        helper.FetchDataHelper(component, event);
    },
    
    getMore: function(component, event, helper) {
        helper.GetMoreDataHelper(component, event);
    }
})