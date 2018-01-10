public class TMMessage {

    @AuraEnabled
    public Integer errCode { get;set; }
    
    @AuraEnabled
    public String status { get;set; }
    
    @AuraEnabled
    public String errTitle { get;set; }
    
    @AuraEnabled
    public String errType{ get;set; }
    
    @AuraEnabled
    public String message { get;set; }
    
    @AuraEnabled
    public Object result { get;set; }
    
    public TMMessage() {
        this.errCode = 0;
        this.status = 'OK';
        this.errTitle = '成功実行済み';
        this.errType = 'success';
        this.message = ' ';
    }
    
    public TMMessage(String message) {
        setError(message);
    }
    
    public TMMessage(String status, String message) {
        this.status = status;
        this.message = message;
    }
    
    public void setErrMessage(String message) {
        setError(message);
    }
    
    private void setError(String message) {
        this.errCode = 1;
        this.status = 'error';
        this.errTitle = '失敗実行';
        this.errType = 'error';
        this.message = message;
    }
}