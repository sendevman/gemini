package com.gemini.beans.types;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/30/18
 * Time: 2:37 AM
 */
public enum SpecializedSchoolCategory {
    MUSIC("Música"),
    SCIENCE_AND_MATHEMATHICS("Ciencias y Matemáticas"),
    FINE_ARTS("Bellas Artes"),
    BILINGUE("Bilingüe"),
    MONTESSORI("Montessori");

    String description;

    SpecializedSchoolCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
