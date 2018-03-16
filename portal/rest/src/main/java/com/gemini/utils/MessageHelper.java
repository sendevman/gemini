package com.gemini.utils;

import com.google.common.base.Function;
import com.google.common.collect.FluentIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/16/18
 * Time: 1:49 AM
 */
@Component
public class MessageHelper {

    @Autowired
    Environment env;

    public List<String> processMessages(String... message) {
        return FluentIterable
                .from(message)
                .transform(new Function<String, String>() {
                    @Override
                    public String apply(String key) {
                        return processMessage(key);
                    }
                }).toList();
    }

    public String processMessage(String messageKey) {
        return env.getProperty("messages.".concat(messageKey));
    }
}