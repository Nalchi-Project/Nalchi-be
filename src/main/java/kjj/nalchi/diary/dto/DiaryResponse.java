package kjj.nalchi.diary.dto;

import kjj.nalchi.diary.domain.Emotion;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class DiaryResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDate date;
    private Emotion emotion;
    private String writer;
}
