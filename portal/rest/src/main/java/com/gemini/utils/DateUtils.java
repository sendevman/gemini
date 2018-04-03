package com.gemini.utils;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.Years;

import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/12/18
 * Time: 8:17 PM
 */
public final class DateUtils {

    public static LocalDate toLocalDate(Date input) {
        return LocalDate.fromDateFields(input);
    }

    public static Date toDate(LocalDate input) {
        return input.toDate();
    }

    public static Date toDate(LocalDateTime input) {
        return input.toDate();
    }

    public static Date getCurrentDate() {
        return new Date();
    }

    public static int toYears(Date input){
        return Years.yearsBetween(new DateTime(input), DateTime.now()).getYears();
    }

    public static Date addHours(Date now, int hours){
        return DateUtils.toDate(LocalDateTime.fromDateFields(now).plusHours(hours));
    }

    public static Date addMinutes(Date now, int minutes){
        return DateUtils.toDate(LocalDateTime.fromDateFields(now).plusMinutes(minutes));
    }

    public static void main(String[] args) {
        LocalDate now = LocalDate.now();
        System.out.println(now.toDate());

        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println(dateTime.toDate());
        
    }

}