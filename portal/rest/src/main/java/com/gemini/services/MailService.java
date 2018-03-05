package com.gemini.services;

import com.gemini.beans.forms.PreEnrollmentBean;
import com.gemini.beans.forms.User;
import com.gemini.beans.requests.PreEnrollmentSubmitRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import javax.mail.MessagingException;
import java.util.AbstractMap.SimpleEntry;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 1:51 PM
 */
@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;
    @Autowired
    private PreEnrollmentService preEnrollmentService;
    @Value("${email.from}")
    private String fromEmail;
    @Value("${website.url}${website.context-path}")
    private String publicUrl;


    private String composeBody(Map<String, String> params, String templateName) {
        Context ctx = new Context();
        params.forEach((key, value) -> ctx.setVariable(key, value));
        return templateEngine.process(templateName, ctx);
    }

    private SimpleMailMessage accountRegisterMail(User user, String link) {
        SimpleMailMessage registerMail = new SimpleMailMessage();
        registerMail.setFrom(fromEmail);
        registerMail.setTo(user.getEmail());
        registerMail.setSubject("Registro en Linea - Activar Cuenta");
        Map<String, String> params =
                Collections.unmodifiableMap(Stream.of(
                        new SimpleEntry<>("link", link)
                ).collect(Collectors.toMap(SimpleEntry::getKey, SimpleEntry::getValue)));
        registerMail.setText(composeBody(params, "emails/registration"));
        return registerMail;
    }

    private SimpleMailMessage preEnrollmentSubmit(User user, PreEnrollmentSubmitRequest enrollmentBean) {
        PreEnrollmentBean preEnrollmentBean = preEnrollmentService.findById(enrollmentBean.getRequestId());
        SimpleMailMessage preEnrollmentMail = new SimpleMailMessage();
        preEnrollmentMail.setFrom(fromEmail);
        preEnrollmentMail.setTo(user.getEmail());
        preEnrollmentMail.setSubject("Pre-Matricula Recibida");
        Map<String, String> params =
                Collections.unmodifiableMap(Stream.of(
                        new SimpleEntry<>("studentName", preEnrollmentBean.getStudentFullName())
                ).collect(Collectors.toMap(SimpleEntry::getKey, SimpleEntry::getValue)));
        preEnrollmentMail.setText(composeBody(params, "emails/pre-enrollment-submit"));
        return preEnrollmentMail;
    }

    private SimpleMailMessage forgetPasswordMail(String to) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromEmail);
        mail.setTo(to);
        mail.setSubject("Registro en Linea - Olvido Contraseña");
//        registerMail.setText();
        return mail;
    }

    private SimpleMailMessage forgetUserMail(String to) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromEmail);
        mail.setTo(to);
        mail.setSubject("Registro en Linea - Olvido Usuario");
//        registerMail.setText();
        return mail;
    }

    public boolean sendRegisterEmail(User userBean, String activationCode) {
        String link = String.format("%s/activate/%s", publicUrl, activationCode);
        return send(accountRegisterMail(userBean, link));
    }

    public boolean sendPreEnrollmentSubmitEmail(User user, PreEnrollmentSubmitRequest request) {
        return send(preEnrollmentSubmit(user, request));
    }

    public void sendUserForgotEmail(String email) {
        send(forgetUserMail(email));
    }

    public void sendPassowrdForgotEmail(String email) {
        send(forgetPasswordMail(email));
    }

    public boolean send(SimpleMailMessage message) {
        boolean sent = false;
        try {
            final MimeMessageHelper helper =
                    new MimeMessageHelper(mailSender.createMimeMessage(), true, "UTF-8"); // true = multipart
            helper.setSubject(message.getSubject());
            helper.setFrom(message.getFrom());
            helper.setTo(message.getTo());
            helper.setText(message.getText(), true);
            mailSender.send(helper.getMimeMessage());
            sent = true;
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return sent;

    }


}