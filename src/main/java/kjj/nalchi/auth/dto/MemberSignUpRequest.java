package kjj.nalchi.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class MemberSignUpRequest {

    @NotBlank(message = "이름은 필수 입력입니다.")
    private String name;

    @NotBlank(message = "아이디는 필수 입력입니다.")
    private String username;

    @NotBlank(message = "비밀번호는 필수 입력입니다.")
    private String password;

    @NotBlank(message = "닉네임은 필수 입력입니다.")
    private String nickname;

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수 입력입니다.")
    private String email;
}
