({
    init: function(cmp, evt) {
        cmp.set("v.items", [
            {
               	text: "Chat Group",
                link: "/chat-group"
            },
            {
                text: "Menu 2",
                link: "#"
            },
            {
                text: "Menu 3",
                link: "#"
            }
		]);
    },
    
    handlePage : function(component, event, helper)
    {
        //debugger; // the JS debugger will pause here
        var url = event.getSource().get("v.value");
        if (url != "#") {
            var urlEvent = $A.get("e.force:navigateToURL");
            urlEvent.setParams({"url": url});
            urlEvent.fire();
        }
    },
})