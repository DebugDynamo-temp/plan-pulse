package com.project.planpulse.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class VirtualThreadConfig {
    @Bean
    public TaskExecutor taskExecutor() {
        return new VirtualThreadTaskExecutor();
    }

    public static class VirtualThreadTaskExecutor implements TaskExecutor {
        private final Executor executor = Executors.newVirtualThreadPerTaskExecutor();

        @Override
        public void execute(Runnable task) {
            executor.execute(task);
        }
    }
}
