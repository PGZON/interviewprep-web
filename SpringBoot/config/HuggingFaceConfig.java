package com.interviewprep.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import lombok.Data;

@Configuration
@EnableConfigurationProperties(HuggingFaceConfig.HuggingFaceProperties.class)
public class HuggingFaceConfig {

    private final HuggingFaceProperties properties;

    public HuggingFaceConfig(HuggingFaceProperties properties) {
        this.properties = properties;
    }

    @Bean
    public RestTemplate huggingFaceRestTemplate() {
        return new RestTemplateBuilder()
            .defaultHeader("Authorization", "Bearer " + properties.getApiKey())
            .defaultHeader("Content-Type", "application/json")
            .build();
    }

    @ConfigurationProperties(prefix = "huggingface")
    @Data
    public static class HuggingFaceProperties {
        private String apiKey;
        private String modelId;
        private String apiUrl = "https://router.huggingface.co/v1/chat/completions"; // Updated to Chat Completions API
    }
}
