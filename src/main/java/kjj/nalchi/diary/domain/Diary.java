package kjj.nalchi.diary.domain;

import jakarta.persistence.*;
import kjj.nalchi.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private Emotion emotion;
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public void update(String title, String content, LocalDate date, Emotion emotion) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.emotion = emotion;
    }

}
