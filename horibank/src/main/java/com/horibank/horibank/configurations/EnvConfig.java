package com.horibank.horibank.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class EnvConfig {
    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure().directory(".").load();
    }
    
    @Bean
    public String dbUrl(Dotenv dotenv) {
        return dotenv.get("DB_URL");
    }

    @Bean
    public String dbUsername(Dotenv dotenv) {
        return dotenv.get("DB_USERNAME");
    }

    @Bean
    public String dbPassword(Dotenv dotenv) {
        return dotenv.get("DB_PASSWORD");
    }
}
