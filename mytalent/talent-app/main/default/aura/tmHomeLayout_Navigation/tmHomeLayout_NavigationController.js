({
    init: function(cmp, evt) {
        cmp.set("v.items", [
            {
               	text: "Menu 1",
                link: "http://www.google.com"
            },
            {
                text: "Menu 2",
                link: "http://www.google.com"
            },
            {
                text: "Menu 3",
                link: "http://www.google.com"
            }
		]);
    },
    
	handleClick : function(component, event, helper)
    {
        var menu = component.find("menulist");
        $A.util.toggleClass(menu, "slds-is-open"); 
    }
})