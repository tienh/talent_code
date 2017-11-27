({
    init: function(cmp, evt) {
        cmp.set("v.types", [
            {
                code: 1,
                name: "Finding",
                icon: "action:flow"
            },
            {
                code: 2,
                name: "FFS",
               	icon: ""
            },
            {
                code: 3,
                name: "FPI",
                icon: ""
            }
        ]);
        cmp.set("v.personalities", [
            {
                name: "素質・適正",
                children: [
                    { 
                        code: 1,
                        type: "Finding" 
                    },
                    { 
                        code: 2,
                        type: "FFS" 
                    },
                    { 
                        code: 3,
                        type: "SPI" 
                    }
                ]
            },
            {
                name: "価値観・考え方",
                children: [
                    { 
                        code: 1,
                        type: "Finding" 
                    },
                    { 
                        code: 2,
                        type: "FFS" 
                    },
                    { 
                        code: 3,
                        type: "SPI" 
                    }
                 ]
            },
            {
                name: "行動特性",
                children: [
                    { 
                        code: 1,
                        type: "Finding" 
                    },
                    { 
                        code: 2,
                        type: "FFS" 
                    },
                    { 
                        code: 3,
                        type: "SPI" 
                    }
                ]
            },
            {
                name: "知識・経験",
                expanded: false,
                children: [
                    { 
                        code: 1,
                        type: "Finding" 
                    },
                    { 
                        code: 2,
                        type: "FFS" 
                    },
                    { 
                        code: 3,
                        type: "SPI" 
                    }
                ]
            }
        ]);
    }
})