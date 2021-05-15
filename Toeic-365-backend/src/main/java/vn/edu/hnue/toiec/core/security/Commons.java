package vn.edu.hnue.toiec.core.security;

public class Commons {
    public static final String AUTH_URL = "/auth/**";
    public static final String SWAGGER_URL = "/swagger-ui.html";
    public static final String AUTH_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String TOKEN_SECRET = "secret";
    public static final long TOKEN_EXPIRATION_TIME = 7*24*60*60*1000;
    public static final long TOKEN_CONFIRM_EMAIL_EXPIRATION_TIME = 24*60*60*1000;

    public static final String[] PUBLIC_URLs = new String[]{
            "/", AUTH_URL, "/user/**", "/fileFolders/**", "/favicon.ico**"
    };
}
