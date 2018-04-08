package com.gemini.admin;

import com.gemini.admin.security.SiePasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
public class AdminPortalApplication extends SpringBootServletInitializer {

    final static Logger logger = LoggerFactory.getLogger(AdminPortalApplication.class.getName());
    /*
            TMAX1O -> /tmax1o/ias/srs/portal/
            PMAX1O -> /pmax1o/ias/srs/portal/
            DEV -> /home/ubuntu/srs/portal/
     */
    static final String PROPS_DIR;

    static {
        System.out.println("Before Setting default timezone :" + new Date());
//        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        TimeZone.setDefault(TimeZone.getTimeZone("America/Puerto_Rico"));
        System.out.println("Before setting timezone :" + new Date());


        logger.info("***Getting props from System***");
        if (StringUtils.hasText(System.getProperty("srs.admin.config.path")))
            PROPS_DIR = System.getProperty("srs.admin.config.path");
        else
            PROPS_DIR = "/home/ubuntu/srs/admin/";
        logger.info(String.format("***config location path in use is: %s***", "spring.config.location:".concat(PROPS_DIR)));
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application
                .sources(AdminPortalApplication.class)
                .properties("spring.config.location:".concat(PROPS_DIR));
    }

    public static void main(String[] args) {
        final String[] a = new String[args.length + 1];

        a[0] = "--spring.config.location=".concat(PROPS_DIR);
        System.arraycopy(args, 0, a, 1, args.length);
        SpringApplication.run(AdminPortalApplication.class, a);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new SiePasswordEncoder();
    }


}
