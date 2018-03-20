package com.gemini;

import com.gemini.database.dao.MockSchoolMaxDaoImpl;
import com.gemini.database.dao.SchoolMaxDaoImpl;
import com.gemini.database.dao.SchoolMaxDaoInterface;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 3/19/18
 * Time: 6:03 PM
 */
@Configuration
public class AppProperties {

    @Bean
    @ConditionalOnProperty(value = "smax.interface.use", havingValue = "mock")
    public SchoolMaxDaoInterface mockSmax(){
        return new MockSchoolMaxDaoImpl();
    }

    @Bean
    @ConditionalOnProperty(value = "smax.interface.use", havingValue = "real", matchIfMissing = true)
    public SchoolMaxDaoInterface prodMax(){
        return new SchoolMaxDaoImpl();
    }
}