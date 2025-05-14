package kjj.nalchi.diary.controller;

import kjj.nalchi.common.custom.CustomUserDetails;
import kjj.nalchi.diary.dto.DiaryRequest;
import kjj.nalchi.diary.dto.DiaryResponse;
import kjj.nalchi.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diary")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
    private final DiaryService diaryService;

    @PostMapping
    public ResponseEntity<DiaryResponse> createDiary(@RequestBody DiaryRequest request,
                                                     @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(diaryService.createDiary(request, userDetails.getMember()));
    }

    @GetMapping
    public ResponseEntity<List<DiaryResponse>> getMyDiaries(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(diaryService.getMyDiaries(user.getMember()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<DiaryResponse> getDiaryById(@PathVariable Long id,
                                                      @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(diaryService.getDiaryById(id, user.getMember()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DiaryResponse> updateDiary(@PathVariable Long id,
                                                     @RequestBody DiaryRequest request,
                                                     @AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(diaryService.updateDiary(id, request, user.getMember()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable Long id,
                                            @AuthenticationPrincipal CustomUserDetails user) {
        diaryService.deleteDiary(id, user.getMember());
        return ResponseEntity.noContent().build();
    }
}
