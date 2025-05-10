package kjj.nalchi.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KafkaTestController {

    private final KafkaProducer producer;

    @PostMapping("/api/test/diary")
    public String testDiary(@RequestBody KafkaDTO dto) {
        producer.sendDiary("diary-submitted", dto);
        return "메시지 전송 완료!";
    }
}

