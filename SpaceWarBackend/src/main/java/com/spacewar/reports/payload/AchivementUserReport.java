package com.spacewar.reports.payload;

public class AchivementUserReport {
    private Long PLID;
    private String NICKNAME;

    private int POINTS;
    private String PERSENT;
    private String MAIL;

    public AchivementUserReport(Long PLID, String NICKNAME, int POINTS, String PERSENT, String MAIL) {
        this.PLID = PLID;
        this.NICKNAME = NICKNAME;
        this.POINTS = POINTS;
        this.PERSENT = PERSENT;
        this.MAIL = MAIL;
    }

    public int getPOINTS() {
        return POINTS;
    }

    public void setPOINTS(int POINTS) {
        this.POINTS = POINTS;
    }

    public Long getPLID() {
        return PLID;
    }

    public void setPLID(Long PLID) {
        this.PLID = PLID;
    }

    public String getNICKNAME() {
        return NICKNAME;
    }

    public String getPERSENT() {
        return PERSENT;
    }

    public String getMAIL() {
        return MAIL;
    }

    public void setNICKNAME(String NICKNAME) {
        this.NICKNAME = NICKNAME;
    }

    public void setPERSENT(String PERSENT) {
        this.PERSENT = PERSENT;
    }

    public void setMAIL(String MAIL) {
        this.MAIL = MAIL;
    }
}
