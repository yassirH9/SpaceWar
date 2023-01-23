package com.spacewar.reports.payload;

public class RankingUserReport {

    private long PLID;
    private String MAIL;
    private String NICKNAME;
    private int POINTS;

    public RankingUserReport(long PLID, String MAIL, String NICKNAME, int POINTS) {
        this.PLID = PLID;
        this.MAIL = MAIL;
        this.NICKNAME = NICKNAME;
        this.POINTS = POINTS;
    }

    public long getPLID() {
        return PLID;
    }

    public String getMAIL() {
        return MAIL;
    }

    public String getNICKNAME() {
        return NICKNAME;
    }

    public int getPOINTS() {
        return POINTS;
    }

    public void setPLID(long PLID) {
        this.PLID = PLID;
    }

    public void setMAIL(String MAIL) {
        this.MAIL = MAIL;
    }

    public void setNICKNAME(String NICKNAME) {
        this.NICKNAME = NICKNAME;
    }

    public void setPOINTS(int POINTS) {
        this.POINTS = POINTS;
    }
}
