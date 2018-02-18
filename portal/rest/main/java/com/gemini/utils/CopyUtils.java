package com.gemini.utils;

import org.springframework.beans.BeanUtils;

import java.util.Random;

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

    public static void main(String[] args) {
        int n = 100;
        while (n > 0) {
            System.out.println(generateActivationCode("rodriguez perez"));
            n--;
        }
    }

    public static String generateActivationCode(String lastName) {
        String output = lastName.substring(0, 2).toUpperCase();

        byte[] array = new byte[24];
        int randInt;

        Random generator = new Random();

        for (int ii = 0; ii < 24; ii++) {
            randInt = generator.nextInt(62);  // 10 + 26 + 26 = 62  , gives range [0-61]
            if (randInt <= 9) {
                array[ii] = (byte) ((randInt + 48) & 0xFF);         //digits
            } else {
                if (randInt > 9 && randInt <= 35) {
                    array[ii] = (byte) ((randInt + 55) & 0xFF); //uppercase letters
                } else {
                    array[ii] = (byte) ((randInt + 61) & 0xFF); //lowercase letters
                }
            }
        }
        output = output.concat(new String(array));

        return output;
    }


}