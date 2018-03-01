package com.gemini.services;

import com.gemini.beans.forms.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    @Value("${email.from}")
    private String fromEmail;
    @Value("${website.url}")
    private String publicUrl;


    private SimpleMailMessage accountRegisterMail(User user, String link) {
        SimpleMailMessage registerMail = new SimpleMailMessage();
        registerMail.setFrom(fromEmail);
        registerMail.setTo(user.getEmail());
        registerMail.setSubject("Registro en Linea - Activar Cuenta");
        registerMail.setText(String.format("<html> <a href=\"http://%s\">Confirmar Email</a></html>", link));
        return registerMail;
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
        String link = String.format("%s/registro/activate/%s", publicUrl, activationCode);
        return send(accountRegisterMail(userBean, link));
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