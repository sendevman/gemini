package com.gemini.beans.types;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/16/18
 * Time: 2:39 PM
 */
public enum RequestStatus {
    ACTIVE("Activo"),
    PENDING_TO_REVIEW("Pendiente a Revisar"),
    APPROVED("Aprobada"),
    DENIED("Denegada"),
    REVIEWING("En Revision");

    String description;

    RequestStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
