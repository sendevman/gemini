package com.gemini.security;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/23/18
 * Time: 3:16 PM
 */
public class CsrfHeaderFilter extends OncePerRequestFilter {

    private final Logger logger = Logger.getLogger(CsrfHeaderFilter.class.getName());

    private String uiContextPath;


    public CsrfHeaderFilter(String uiContextPath) {
        this.uiContextPath = uiContextPath;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        if (csrf != null) {
            Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
            String token = csrf.getToken();
            logger.info(String.format("uiContextPath %s", uiContextPath));
            logger.info(String.format("token %s", token));
            if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                cookie = new Cookie("XSRF-TOKEN", token);
                cookie.setPath(uiContextPath);
                response.addCookie(cookie);
            }
        }
        filterChain.doFilter(request, response);
    }
}
