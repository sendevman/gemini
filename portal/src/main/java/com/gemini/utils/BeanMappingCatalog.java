package com.gemini.utils;

import com.gemini.database.jpa.entities.UserEntity;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 6:30 PM
 */
public final class BeanMappingCatalog {

    static Map<Class, Class> catalog = new HashMap();

    static {
        catalog.put(UserEntity.class, UserEntity.class);
    }

//    public static <T> R convert(T object) {
//        try {
//            Class returned = catalog.get(object.getClass());
//            R instance = returned.newInstance();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//    }
}