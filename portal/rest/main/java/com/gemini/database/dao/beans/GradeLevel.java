package com.gemini.database.dao.beans;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/22/18
 * Time: 11:18 AM
 */
public class GradeLevel {

  private String name;
  private String description;

  public GradeLevel(String name, String description) {
    this.name = name;
    this.description = description;
  }

  public GradeLevel() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDisplayName() {
    return String.format("%s-%s", name, description);
  }
}
