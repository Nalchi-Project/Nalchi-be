package kjj.nalchi.member.converter;

import kjj.nalchi.auth.dto.MemberLoginResponse;
import kjj.nalchi.auth.dto.MemberSignUpRequest;
import kjj.nalchi.member.domain.Member;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public  class MemberConverter {

    public static Member fromDto(MemberSignUpRequest request, PasswordEncoder passwordEncoder) {//dto->entity
        return Member.builder()
                .name(request.getName())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .email(request.getEmail())
                .build();
    }

    public static MemberLoginResponse toLoginResponse(String accessToken, String refreshToken) {//응답 데이터를 생성
        return MemberLoginResponse.builder()
                .message("로그인 성공")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
