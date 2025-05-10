package kjj.nalchi.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {

    @KafkaListener(topics = "diary-submitted", groupId = "diary-consumer")
    public void listen(ConsumerRecord<String, String> record) {
        System.out.println("✅ Kafka 메시지 수신됨: " + record.value());
    }
}
