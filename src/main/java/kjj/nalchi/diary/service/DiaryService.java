package kjj.nalchi.diary.service;

import kjj.nalchi.diary.DiaryConverter;
import kjj.nalchi.diary.domain.Diary;
import kjj.nalchi.diary.dto.DiaryRequest;
import kjj.nalchi.diary.dto.DiaryResponse;
import kjj.nalchi.diary.repository.DiaryRepository;
import kjj.nalchi.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;

    public DiaryResponse createDiary(DiaryRequest request, Member member) {
        Diary diary = DiaryConverter.toEntity(request,member);
        return DiaryConverter.toResponse(diaryRepository.save(diary));
    }

    public List<DiaryResponse> getMyDiaries(Member member) {
        List<Diary> diaries = diaryRepository.findAllByMember(member);
        return diaries.stream()
                .map(DiaryConverter::toResponse)
                .collect(Collectors.toList());
    }
    public DiaryResponse getDiaryById(Long id, Member member) {
        Diary diary = diaryRepository.findByIdAndMember(id, member)
                .orElseThrow(() -> new IllegalArgumentException("일기를 찾을 수 없습니다."));
        return DiaryConverter.toResponse(diary);
    }

    public DiaryResponse updateDiary(Long id, DiaryRequest request, Member member) {
        Diary diary = diaryRepository.findByIdAndMember(id, member)
                .orElseThrow(() -> new IllegalArgumentException("일기를 찾을 수 없습니다."));

        diary.update(request.getTitle(), request.getContent(), request.getDate(), request.getEmotion());

        return DiaryConverter.toResponse(diaryRepository.save(diary));
    }

    public void deleteDiary(Long id, Member member) {
        Diary diary = diaryRepository.findByIdAndMember(id, member)
                .orElseThrow(() -> new IllegalArgumentException("일기를 찾을 수 없습니다."));
        diaryRepository.delete(diary);
    }
}
