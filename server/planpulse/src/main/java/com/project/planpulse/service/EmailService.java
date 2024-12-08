package com.project.planpulse.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

import com.sendgrid.Method;
import com.sendgrid.SendGrid;

@Service
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    @Value("${app.reset-password-url}")
    private String resetPasswordUrl; // https://frontend.com/reset-password?token=.....

    public void sendPasswordResetEmail(String toEmail, String token) throws IOException {
        Email from = new Email("no-reply@planpulse.com");
        String subject = "Password Reset Request";
        Email to = new Email(toEmail);
        String resetLink = resetPasswordUrl + token;
        Content content = new Content("text/plain", "Click the link to reset your password: " + resetLink);
        Mail mail = new Mail(from, subject, to, content);
        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        sg.api(request);
    }
}
