package com.gemini;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@SpringBootApplication
@ComponentScan
@EnableConfigurationProperties
@EnableWebSecurity
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class).properties("spring.config.location:/home/ubuntu/srs/portal/");
    }

    public static void main(String[] args) {
        final String[] a = new String[args.length + 1];
        a[0] = "--spring.config.location=/home/ubuntu/srs/portal/";
        System.arraycopy(args, 0, a, 1, args.length);
        SpringApplication.run(Application.class, a);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(15);
    }

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource registroDatasource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "smaxDatasource")
    @ConfigurationProperties(prefix = "spring.smaxDatasource")
    public DataSource smaxDatasource() {
        return DataSourceBuilder.create().build();
    }
}
