package kjj.nalchi.diary.repository;

import kjj.nalchi.diary.domain.Diary;
import kjj.nalchi.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findAllByMember(Member member);
    Optional<Diary> findByIdAndMember(Long id, Member member);
}
