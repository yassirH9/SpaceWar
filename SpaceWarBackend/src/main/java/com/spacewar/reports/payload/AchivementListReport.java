package com.spacewar.reports.payload;

public class AchivementListReport {

    private String NICKNAME;
    private String MAIL;
    private String ACHIVEMENT_NAME;
    private String ACHIVEMENT_DESCRIPTION;
    private String HAVE;

    public AchivementListReport(String NICKNAME, String MAIL, String ACHIVEMENT_NAME, String ACHIVEMENT_DESCRIPTION, String HAVE) {
        this.NICKNAME = NICKNAME;
        this.MAIL = MAIL;
        this.ACHIVEMENT_NAME = ACHIVEMENT_NAME;
        this.ACHIVEMENT_DESCRIPTION = ACHIVEMENT_DESCRIPTION;
        this.HAVE = HAVE;
    }

    public String getNICKNAME() {
        return NICKNAME;
    }

    public void setNICKNAME(String NICKNAME) {
        this.NICKNAME = NICKNAME;
    }

    public String getMAIL() {
        return MAIL;
    }

    public void setMAIL(String MAIL) {
        this.MAIL = MAIL;
    }

    public String getACHIVEMENT_NAME() {
        return ACHIVEMENT_NAME;
    }

    public void setACHIVEMENT_NAME(String ACHIVEMENT_NAME) {
        this.ACHIVEMENT_NAME = ACHIVEMENT_NAME;
    }

    public String getACHIVEMENT_DESCRIPTION() {
        return ACHIVEMENT_DESCRIPTION;
    }

    public void setACHIVEMENT_DESCRIPTION(String ACHIVEMENT_DESCRIPTION) {
        this.ACHIVEMENT_DESCRIPTION = ACHIVEMENT_DESCRIPTION;
    }

    public String getHAVE() {
        return HAVE;
    }

    public void setHAVE(String HAVE) {
        this.HAVE = HAVE;
    }
}
