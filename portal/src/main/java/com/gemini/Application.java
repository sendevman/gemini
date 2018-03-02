package com.gemini;

import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.conn.util.PublicSuffixMatcherLoader;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Primary;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

import javax.sql.DataSource;

@SpringBootApplication
@ComponentScan
@EnableConfigurationProperties
@EnableWebSecurity
@ServletComponentScan
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
    @Qualifier("httpsRestTemplate")
    public RestTemplate httpsRestTemplate() {
        CloseableHttpClient httpClient = HttpClients
                .custom()
                .setSSLHostnameVerifier(new DefaultHostnameVerifier(PublicSuffixMatcherLoader.getDefault()))
                .build();
        return new RestTemplate(new HttpComponentsClientHttpRequestFactory(httpClient));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(15);
    }

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties mainDatasourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSource mainDatasource() {
        return mainDatasourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean
    @ConfigurationProperties("spring.smaxDatasource")
    public DataSourceProperties smaxDatasourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "smaxDatasource")
    @ConfigurationProperties(prefix = "spring.smaxDatasource")
    public DataSource smaxDatasource() {
        return smaxDatasourceProperties().initializeDataSourceBuilder().build();
    }

    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        return loggingFilter;
    }
}
