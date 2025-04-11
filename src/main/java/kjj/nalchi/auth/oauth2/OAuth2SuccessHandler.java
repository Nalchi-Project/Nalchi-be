package kjj.nalchi.auth.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import kjj.nalchi.common.custom.CustomOAuth2User;
import kjj.nalchi.common.jwt.JwtUtil;
import kjj.nalchi.member.domain.Member;
import kjj.nalchi.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User customUser = (CustomOAuth2User) authentication.getPrincipal();
        String email = customUser.getEmail();

        Member member = memberRepository.findByUsername(email)
                .orElseGet(() -> memberRepository.save(Member.builder()
                        .username(email)
                        .password("")
                        .email(email)
                        .name(customUser.getAttribute("name"))
                        .build()));

        String accessToken = jwtUtil.generateAccessToken(email);
        String refreshToken = jwtUtil.generateRefreshToken(email);

        // 세션 무효화: Spring Security 로그인 세션 제거
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        // 프론트엔드 리다이렉트 주소로 토큰 전달
        String redirectUrl = UriComponentsBuilder
                .fromUriString("http://localhost:3000/oauth2/redirect")
                .queryParam("accessToken", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}
