package com.gemini.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gemini.beans.forms.AddressBean;
import com.gemini.database.dao.beans.School;
import org.springframework.beans.BeanUtils;
import org.springframework.boot.jackson.JsonObjectSerializer;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 2:48 PM
 */
public final class CopyUtils {

    public static <T, R> R convert(T object, Class<R> clazz) {
        try {
            R convertObject = clazz.newInstance();
            if (object != null)
                BeanUtils.copyProperties(object, convertObject, clazz);
            return convertObject;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static <T, R> List<R> convert(List<T> object, Class<R> clazz) {
        try {
            List<R> list = new ArrayList<>();
            for (T t : object) {
                R dest = convert(t, clazz);
                list.add(dest);
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static AddressBean createAddressBean(School school) {
        AddressBean addressBean = new AddressBean();
        addressBean.setLine1(school.getAddressLine_1());
        addressBean.setLine2(school.getAddressLine_2());
        addressBean.setCity(school.getCity());
        addressBean.setZipcode(school.getZipCode());
        return addressBean;
    }

    public static void main(String[] args) {
        MultiValueMap<String, String> test = new LinkedMultiValueMap<>();
        test.add("secret", "pepe");
        test.add("response", "resp");
        try {
            System.out.println(new ObjectMapper().writeValueAsString(test));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        String list[] = {"5z", "5za", "5aa"};
        HashSet<String> set = new HashSet<String>();
        set.addAll(Arrays.asList(list));
        for (String s : set) {
            System.out.println(s);
        }


    }

}