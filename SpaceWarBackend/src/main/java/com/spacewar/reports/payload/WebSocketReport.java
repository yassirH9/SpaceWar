package com.spacewar.reports.payload;

public class WebSocketReport {
    private String ADRESS;
    private String SESSIONID;

    public WebSocketReport(String ADRESS, String SESSIONID) {
        this.ADRESS = ADRESS;
        this.SESSIONID = SESSIONID;
    }

    public String getADRESS() {
        return ADRESS;
    }

    public void setADRESS(String ADRESS) {
        this.ADRESS = ADRESS;
    }

    public String getSESSIONID() {
        return SESSIONID;
    }

    public void setSESSIONID(String SESSIONID) {
        this.SESSIONID = SESSIONID;
    }
}
