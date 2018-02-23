package com.gemini.beans.types;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/22/18
 * Time: 9:16 PM
 */
public enum EntryType {
    NEW_ENTRY("Nuevo Ingreso"),
    EXISTING_ENTRY("Existente");

    String description;

    EntryType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}