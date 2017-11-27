({
    init: function(cmp, evt) {
        var today = new Date();
        
        cmp.set("v.comments", [
            {
                code: 1,
                date: "2017.10.01",
                department: "Director",
                subDepartment: "ADV-B",
                team: "Fukuoka",
                branch: "福岡",
                comment: "福岡MGとしてよくやってくれている。今後は成果を出すことを意識してほしい。",
                author: "zaki"
            },
            {
                code: 2,
                date: "2017.01.01",
                department: "SE",
                subDepartment: "ADV-C",
                team: "兎チーム",
                branch: "東京",
                comment: "今期の売り上げに大いに貢献してくれた。PMとしてのスキルが伸びてきている。",
                author: "suzuki"
            },
            {
                code: 3,
                date: "2016.05.01",
                department: "Director",
                subDepartment: "ADV-F",
                team: "Fukuoka",
                branch: "福岡",
                comment: "Còn gì đâu ngoài linh hồn rách tả tơi này.",
                author: "Khang"
            }
        ]);
    },
    
    search: function(component, event, helper) {
        var DateFrom = component.find("dt_from").get("v.value");
        var DateTo = component.find("dt_to").get("v.value");
        helper.SearchHelper(component, event);
    }
})