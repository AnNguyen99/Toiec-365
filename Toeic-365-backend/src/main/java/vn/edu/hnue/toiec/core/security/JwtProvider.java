package vn.edu.hnue.toiec.core.security;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    public String generateTokenByUsername(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Commons.TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, Commons.TOKEN_SECRET)
                .compact();
    }

    public String generateKeyToConfirm(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + Commons.TOKEN_CONFIRM_EMAIL_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, Commons.TOKEN_SECRET)
                .compact();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(Commons.TOKEN_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature -> Message: {} ", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token -> Message: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token -> Message: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token -> Message: {}", e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty -> Message: {}", e);
        }
        return false;
    }

    public String getHeaderFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(Commons.TOKEN_SECRET)
                .parseClaimsJws(token)
                .getBody().getSubject();
    }
}
