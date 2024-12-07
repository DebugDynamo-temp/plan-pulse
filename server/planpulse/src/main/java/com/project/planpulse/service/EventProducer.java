package com.project.planpulse.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class EventProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void publishEvent(String topic, String message) {
        kafkaTemplate.send(topic, message);
    }
}
