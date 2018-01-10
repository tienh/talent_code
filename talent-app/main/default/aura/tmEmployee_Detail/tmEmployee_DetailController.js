({
	init: function(component, event, helper) {
        var rDisp = [
            { name : "line1", obj : [
                { key : "姓", value : component.get("v.employee.Last_Name__c") },
                { key : "名", value : component.get("v.employee.First_Name__c") }
            ]}, 
            { name : "line2", obj : [
                { key : "姓（かな）", value : component.get("v.employee.Last_Name_Kana__c") },
                { key : "名（かな）", value : component.get("v.employee.First_Name_Kana__c") }
            ]}, 
            { name : "line3", obj : [
                { key : "表示名", value : component.get("v.employee.Name") },
                { key : "性別", value : component.get("v.employee.Gender_Disp__c") }
            ]}, 
            { name : "line4", obj : [
                { key : "生年月日", value : component.get("v.employee.Birthday_Disp__c") },
                { key : "入社日", value : component.get("v.employee.Employee_Hiring__r.Hire_Date_Disp__c") }
            ]}, 
            { name : "line5", obj : [
                { key : "職種", value : component.get("v.employee.Employee_Hiring__r.Job_Category__c") },
                { key : "メールアドレス", value : component.get("v.employee.Employee_Hiring__r.Email__c") }
            ]}, 
            { name : "line6", obj : [
                { key : "職位", value : component.get("v.employee.Employee_Hiring__r.Position__c") },
                { key : "在職状況", value : component.get("v.employee.Employee_Hiring__r.Status__c") }
            ]}, 
            { name : "line7", obj : [
                { key : "部署", value : component.get("v.employee.Employee_Hiring__r.Department__c") },
                { key : "勤務地", value : component.get("v.employee.Employee_Hiring__r.Work_Location__c") }
            ]}, 
            { name : "line8", obj : [
                { key : "現住所", value : component.get("v.employee.Employee_Hiring__r.Current_Address__c") }
            ]},
            { name : "line9", obj : [
                { key : "TEL", value : component.get("v.employee.Employee_Hiring__r.Tel__c") }
            ]},
            { name : "line10", obj : [
                { key : "緊急連絡先", value : component.get("v.employee.Employee_Hiring__r.Emergency_Contact__c") }
            ]},
            { name : "line11", obj : [
                { key : "FFS", value : component.get("v.employee.Employee_Hiring__r.ffs__c") }
            ]},
        ]; 
        component.set("v.tBlock", rDisp);
        //debugger; // the JS debugger will pause here
    },
})