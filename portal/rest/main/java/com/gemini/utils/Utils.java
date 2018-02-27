package com.gemini.utils;

import org.springframework.util.StringUtils;

import java.util.Random;
import java.util.stream.Stream;

import static java.util.stream.Collectors.joining;


/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/22/18
 * Time: 9:22 PM
 */
public final class Utils {

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

    public static String toLastName(String fatherLastName, String motherLastName) {
        fatherLastName = StringUtils.capitalize(fatherLastName.trim());
        motherLastName = StringUtils.capitalize(motherLastName.trim());
        return String.format("%s %s", fatherLastName, motherLastName);
    }

    public static String toFullName(String... names) {
        return Stream.of(names)
                .filter(s -> s != null && !s.isEmpty())
                .collect(joining(" "));
    }

}