({
    init: function(component, event, helper) {
        //debugger; // the JS debugger will pause here
        var id = helper.getParameterByName(component , event, 'recordId');
        if (id != null) {
            component.set("v.recordId", id);
        } 
        helper.getInfo(component);
    },
    
    changeTab: function(component, event, helper) {
        var clickedTab = helper.getContainerDiv(event, null);
        var findKey = clickedTab.classList.contains('slds-tabs_scoped__item') ? 'tabsub' : 'tabpage';
        //var tabs =  component.find('tabpage');
        var tabs =  component.find(findKey);
        for(var idx = 0; idx < tabs.length; idx++)
         {
             var tab = tabs[idx].getElement(0);
             $A.util.removeClass(tab, 'slds-is-active');
             $A.util.removeClass(component.find(tab.children[0].getAttribute('aria-controls')), 'slds-show');
             $A.util.addClass(component.find(tab.children[0].getAttribute('aria-controls')), 'slds-hide');
         }

        $A.util.addClass(clickedTab, 'slds-is-active');
        $A.util.addClass(component.find(clickedTab.children[0].getAttribute('aria-controls')), 'slds-show');
        $A.util.removeClass(component.find(clickedTab.children[0].getAttribute('aria-controls')), 'slds-hide');
    }
})