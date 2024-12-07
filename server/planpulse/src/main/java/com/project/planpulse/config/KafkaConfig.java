package com.project.planpulse.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig {
    @Bean
    public NewTopic planpulseTopic() {
        return new NewTopic("planpulse-events", 1, (short) 1);
    }
}
