({
    init: function(cmp, evt) {
        cmp.set("v.levels", [
            {
                code: 1,
                name: "excellent",
                icon: "action:new_opportunity"
            },
            {
                code: 2,
                name: "good",
               	icon: "action:new_lead"
            },
            {
                code: 3,
                name: "expected",
                icon: "action:goal"
            },
            {
                code: 4,
                name: "motivated",
                icon: "action:update"
            }
        ]);
        cmp.set("v.skills", [
            {
                name: "Techniacal Skill",
                expanded: false,
                children: [
                    { 
                        code: 1,
                        level: "excellent" 
                    },
                    { 
                        code: 2,
                        level: "good" 
                    },
                    { 
                        code: 3,
                        level: "expected" 
                    },
                    { 
                        code: 4,
                        level: "motivated" 
                    }
                ]
            },
            {
                name: "Human Skill",
                expanded: false,
                children: [
                    { 
                        level: "excellent" 
                    },
                    { 
                        level: "good" 
                    },
                    { 
                        level: "expected" 
                    },
                    { 
                        level: "motivated" 
                    }
                ]
            },
            {
                name: "Conceptual Skill",
                expanded: false,
                children: [
                    { 
                        level: "excellent" 
                    },
                    { 
                        level: "good" 
                    },
                    { 
                        level: "expected" 
                    },
                    { 
                        level: "motivated" 
                    }
                ]
            }
        ]);
    },
    
    toggle: function(cmp, evt) {
        var rows = cmp.get("v.skills");
        rows[evt.target.dataset.index].expanded = !rows[evt.target.dataset.index].expanded;
        cmp.set("v.skills", rows);
    }
})