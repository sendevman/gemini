package com.gemini.utils;

import com.gemini.beans.IdentityForm;
import com.gemini.database.IdentityEntity;
import com.google.common.base.Joiner;
import org.springframework.util.StringUtils;

import java.util.StringTokenizer;
import java.util.UUID;


/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/22/18
 * Time: 9:22 PM
 */
public final class Utils {

    public static String generateKey() {
        return UUID.randomUUID().toString();
    }

    public static String toLastName(String fatherLastName, String motherLastName) {
        fatherLastName = fatherLastName != null ? StringUtils.capitalize(fatherLastName.trim()) : "";
        motherLastName = motherLastName != null ? StringUtils.capitalize(motherLastName.trim()) : "";
        return String.format("%s %s", fatherLastName, motherLastName);
    }

    public static String toFullName(String... names) {
        return Joiner.on(" ")
                .skipNulls()
                .join(names);
    }

    public static void copyLastNames(IdentityEntity entity, IdentityForm form) {
        String lastName = StringUtils.hasText(entity.getLastName()) ? entity.getLastName() : "";
        form.setLastName(lastName);
    }

}