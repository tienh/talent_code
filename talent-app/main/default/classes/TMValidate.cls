public class TMValidate {
    public void checkExistEmp(String employeeId) {
        Integer cnt = [SELECT count() FROM Employee__c WHERE id = :employeeId];
        if (cnt <= 0) throw new MyException(TMErrorMessage.ERR_AUTHORIZED);
    }
    
    public void checkAuthorized(String employeeId) {
        if (!TMHome.isManager() && TMHome.getCurrentUser().Id != employeeId) {
                throw new MyException(TMErrorMessage.ERR_NO_AUTHORITY);
        }
    }
}