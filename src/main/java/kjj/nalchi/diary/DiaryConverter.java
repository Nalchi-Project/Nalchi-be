package kjj.nalchi.diary;

import kjj.nalchi.diary.domain.Diary;
import kjj.nalchi.diary.dto.DiaryRequest;
import kjj.nalchi.diary.dto.DiaryResponse;
import kjj.nalchi.member.domain.Member;

public class DiaryConverter {
    public static Diary toEntity(DiaryRequest request, Member member) {
        return Diary.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .date(request.getDate())
                .emotion(request.getEmotion())
                .member(member)
                .build();
    }

    public static DiaryResponse toResponse(Diary diary) {
        return DiaryResponse.builder()
                .id(diary.getId())
                .title(diary.getTitle())
                .content(diary.getContent())
                .date(diary.getDate())
                .emotion(diary.getEmotion())
                .writer(diary.getMember().getUsername())
                .build();
    }
}
