package kjj.nalchi.diary.dto;

import kjj.nalchi.diary.domain.Emotion;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class DiaryRequest {
    private String title;
    private String content;
    private LocalDate date;
    private Emotion emotion;
}
