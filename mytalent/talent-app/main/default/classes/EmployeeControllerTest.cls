@isTest
public class EmployeeControllerTest {

    static testMethod void findAll() {
        Boolean success = true;
        try {
            Employee__c e = new Employee__c(Name='MTA',Job__c='Dev');
            insert e;
	        EmployeePagedResult r = EmployeeController.findAll('', 0, 1000000, 8, 1);
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }
    
        static testMethod void findByKey() {
        Boolean success = true;
        try {
            Employee__c e = new Employee__c(Name='MST',Job__c='TEST');
            insert e;
	        EmployeePagedResult r = EmployeeController.findAll('Tran', null, null, 8, 1);
        } catch (Exception e) {
            success = false;
        } finally {
	        System.assert(success);
        }
    }
    
}