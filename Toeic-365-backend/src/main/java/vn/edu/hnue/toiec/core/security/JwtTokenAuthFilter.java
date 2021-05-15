package vn.edu.hnue.toiec.core.security;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;

public class JwtTokenAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private UserDetailServiceImpl userDetailService;

    private final Log LOGGER = LogFactory.getLog(getClass());

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String logStartStr = " ----> API: '" + httpServletRequest.getRequestURI() + "' -> Started!";
        this.LOGGER.info(logStartStr);
        String header = httpServletRequest.getHeader(Commons.AUTH_HEADER);
        if (header == null || !header.startsWith(Commons.TOKEN_PREFIX)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = this.getAuthentication(httpServletRequest);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        try {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch (Exception e) {
            String logErrorStr = "API: " + httpServletRequest.getRequestURI() + " -> Error: " + e;
            this.LOGGER.error(logErrorStr);
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(Commons.AUTH_HEADER);
        if (token != null) {
            token = token.replace(Commons.TOKEN_PREFIX, "");
            Object principal = this.jwtProvider.getHeaderFromJwtToken(token);
            if (principal != null) {
                UserDetails userDetails = this.userDetailService.loadUserByUsername((String) principal);
                return new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
            }
            return null;
        }
        return null;
    }

}
