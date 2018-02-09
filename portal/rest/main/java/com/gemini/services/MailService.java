package com.gemini.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

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


    private SimpleMailMessage accountRegisterMail(String to) {
        SimpleMailMessage registerMail = new SimpleMailMessage();
        registerMail.setFrom("");
        registerMail.setTo(to);
        registerMail.setSubject("Registro en Linea - Activar Cuenta");
//        registerMail.setText();
        return registerMail;
    }

    private SimpleMailMessage forgetPasswordMail(String to) {
        SimpleMailMessage registerMail = new SimpleMailMessage();
        registerMail.setFrom("");
        registerMail.setTo(to);
        registerMail.setSubject("Registro en Linea - Olvido Contraseña");
//        registerMail.setText();
        return registerMail;
    }

    private SimpleMailMessage forgetUserMail(String to) {
        SimpleMailMessage registerMail = new SimpleMailMessage();
        registerMail.setFrom("");
        registerMail.setTo(to);
        registerMail.setSubject("Registro en Linea - Olvido Usuario");
//        registerMail.setText();
        return registerMail;
    }

    public void send(SimpleMailMessage message) {
        try {
            final MimeMessageHelper helper =
                    new MimeMessageHelper(mailSender.createMimeMessage(), true, "UTF-8"); // true = multipart
            helper.setSubject(message.getSubject());
            helper.setFrom(message.getFrom());
            helper.setTo(message.getTo());
            helper.setText(message.getText(), true);
            mailSender.send(helper.getMimeMessage());
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }


}