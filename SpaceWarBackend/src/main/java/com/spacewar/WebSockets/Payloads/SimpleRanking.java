package com.spacewar.WebSockets.Payloads;

public class SimpleRanking {

    private long ID;
    private int POINTS;
    private String Username;

    public SimpleRanking(long ID, int POINTS, String username) {
        this.ID = ID;
        this.POINTS = POINTS;
        Username = username;
    }

    public long getID() {
        return ID;
    }

    public int getPOINTS() {
        return POINTS;
    }

    public String getUsername() {
        return Username;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public void setPOINTS(int POINTS) {
        this.POINTS = POINTS;
    }

    public void setUsername(String username) {
        Username = username;
    }
}
