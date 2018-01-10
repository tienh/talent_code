@isTest
public class TMEmployeeTest {

    static testMethod void findAll() {
        Boolean success = true;
        try {
            Employee__c e = new Employee__c(Name='MTA',Job__c='Dev');
            insert e;
            TMEmployeePaged r = TMEmployee.findAll('', 8, 1);
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
            TMEmployeePaged r = TMEmployee.findAll('Tran', 8, 1);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
}