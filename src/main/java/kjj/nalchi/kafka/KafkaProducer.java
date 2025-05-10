package kjj.nalchi.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendDiary(String topic, KafkaDTO dto) {
        kafkaTemplate.send(topic, dto.toString()); // JSON으로 바꾸고 싶으면 ObjectMapper 써도 됨
    }
}
