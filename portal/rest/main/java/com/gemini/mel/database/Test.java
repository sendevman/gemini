package com.gemini.mel.database;

import javax.persistence.*;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/5/18
 * Time: 5:16 PM
 */
@Entity
@Table(name = "test")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
