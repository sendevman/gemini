package com.gemini.admin;

import com.gemini.admin.security.SiePasswordEncoder;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AdminPortalApplication extends SpringBootServletInitializer {

    static final String PROPS_DIR = "/tmax1o/ias/srs/admin/";

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
