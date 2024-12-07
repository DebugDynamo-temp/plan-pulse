package com.project.planpulse.service;

import com.project.planpulse.model.Task;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {
    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;

    public void sendTaskNotification(String toEmail, Task task) throws IOException {
        Email from = new Email("no-reply@planpulse.com");
        String subject = "New Task Assigned: " + task.getTitle();
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", "You have been assigned a new task: " + task.getDescription());
        Mail mail = new Mail(from, subject, to, content);
        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        sg.api(request);
    }
}
