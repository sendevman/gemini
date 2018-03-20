package com.gemini;

import com.gemini.utils.ValidationUtils;
import com.zaxxer.hikari.HikariDataSource;
import org.apache.http.HttpHost;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.conn.util.PublicSuffixMatcherLoader;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
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
public class SRSPortalApplication extends SpringBootServletInitializer {

    final static Logger logger = LoggerFactory.getLogger(SRSPortalApplication.class.getName());
    /*
            TMAX1O -> /tmax1o/ias/srs/portal/
            PMAX1O -> /pmax1o/ias/srs/portal/
            DEV -> /home/ubuntu/srs/portal/
     */
    static final String PROPS_DIR = "/tmax1o/ias/srs/portal/";

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        logger.info("***Starting services from servlet***");
        logger.info(String.format("***config location path : %s***", "spring.config.location:".concat(PROPS_DIR)));
        return application.sources(SRSPortalApplication.class).properties("spring.config.location:".concat(PROPS_DIR));
    }

    public static void main(String[] args) {
        final String[] a = new String[args.length + 1];
        a[0] = "--spring.config.location=".concat(PROPS_DIR);
        System.arraycopy(args, 0, a, 1, args.length);
        logger.info("***Starting services from jar***");
        logger.info(String.format("***config location path : %s***", "--spring.config.location:".concat(PROPS_DIR)));
        SpringApplication.run(SRSPortalApplication.class, a);
    }

    @Bean
    @Qualifier("httpsRestTemplate")
    public RestTemplate httpsRestTemplate(@Value("${oracle.proxy.host}") String proxyHost, @Value("${oracle.proxy.port}") Integer proxyPort) {
        HttpHost proxy = ValidationUtils.valid(proxyHost, proxyPort) ? new HttpHost(proxyHost, proxyPort) : null;
        CloseableHttpClient httpClient = HttpClients
                .custom()
                .setSSLHostnameVerifier(new DefaultHostnameVerifier(PublicSuffixMatcherLoader.getDefault()))
                .setProxy(proxy)
                .build();

        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory(httpClient);
        requestFactory.setConnectTimeout(1000 * 60 * 2);
        requestFactory.setReadTimeout(1000 * 60 * 2);
        return new RestTemplate(requestFactory);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties mainDatasourceProperties() {
        DataSourceProperties properties = new DataSourceProperties();
        properties.setType(HikariDataSource.class);
        return properties;
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
        DataSourceProperties properties = new DataSourceProperties();
        properties.setType(HikariDataSource.class);
        return properties;
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
        loggingFilter.setIncludeHeaders(true);
        return loggingFilter;
    }
}
