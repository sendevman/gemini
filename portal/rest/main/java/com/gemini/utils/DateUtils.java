package com.gemini.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 8:17 PM
 */
public final class DateUtils {

    public static LocalDate toLocalDate(Date input) {
        return input.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static Date toDate(LocalDate input) {
        return Date.from(input.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }


    public static Date toDate(LocalDateTime input) {
        return Date.from(input.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static  Date getCurrentDate() {
        return new Date();
    }


}