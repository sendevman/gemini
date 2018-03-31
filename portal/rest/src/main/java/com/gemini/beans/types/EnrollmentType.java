package com.gemini.beans.types;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/12/18
 * Time: 12:04 PM
 */
public enum EnrollmentType {
    REGULAR("Escuela Regular"),
    OCCUPATIONAL("Escuela Ocupacional"),
    TECHNIQUE("Escuela Institutos"),
    REGULAR_ALTERNATE_SCHOOLS("Escuelas alternas"),
    SPECIALIZED_ALTERNATE_SCHOOLS("Escuelas Especializadas");

    String description;

    EnrollmentType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}