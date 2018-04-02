package com.gemini.services;

import com.gemini.beans.forms.PreEnrollmentBean;
import com.gemini.beans.forms.User;
import com.gemini.beans.internal.UserAction;
import com.gemini.beans.requests.enrollment.PreEnrollmentSubmitRequest;
import com.gemini.beans.requests.user.RegisterRequest;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/9/18
 * Time: 1:51 PM
 */
@Service
public class MailService {
    static Logger logger = LoggerFactory.getLogger(MailService.class.getName());

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;
    @Autowired
    private PreEnrollmentService preEnrollmentService;
    @Autowired
    private CommonService commonService;
    @Value("${email.from}")
    private String fromEmail;
    @Value("${website.url}${website.context-path}")
    private String publicUrl;

    private String toUrl(UserAction link, String param) {
        return String.format("%s".concat(link.getPath()), publicUrl, param);
    }

    private String composeBody(Map<String, String> params, String templateName) {
        Context ctx = new Context();
        for (Map.Entry<String, String> entry : params.entrySet()) {
            ctx.setVariable(entry.getKey(), entry.getValue());
        }
        Iterables.cycle(params.entrySet()).iterator().hasNext();
        return templateEngine.process(templateName, ctx);
    }

    private SimpleMailMessage accountRegisterMail(RegisterRequest request, String link) {
        SimpleMailMessage registerMail = new SimpleMailMessage();
        registerMail.setFrom(fromEmail);
        registerMail.setTo(request.getEmail());
        registerMail.setSubject("Registro en Linea - Activar Cuenta");
        Map<String, String> params = ImmutableMap.of("link", link);
        registerMail.setText(composeBody(params, "emails/registration"));
        return registerMail;
    }

    private SimpleMailMessage preEnrollmentSubmit(User user, PreEnrollmentSubmitRequest enrollmentBean) {
        PreEnrollmentBean preEnrollmentBean = preEnrollmentService.findById(enrollmentBean.getRequestId());
        SimpleMailMessage preEnrollmentMail = new SimpleMailMessage();
        preEnrollmentMail.setFrom(fromEmail);
        preEnrollmentMail.setTo(user.getEmail());
        preEnrollmentMail.setSubject("Matrícula Recibida");
        Map<String, String> params = ImmutableMap.of("studentName", preEnrollmentBean.getStudent().getFullName());
        preEnrollmentMail.setText(composeBody(params, "emails/pre-enrollment-submit"));
        return preEnrollmentMail;
    }

    private SimpleMailMessage forgetPasswordMail(String to, String resetLink, String cancelResetLink) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(fromEmail);
        mail.setTo(to);
        mail.setSubject("Registro en Linea - Olvido Contraseña");
        Map<String, String> params = ImmutableMap.of(
                "resetLink", resetLink
                , "cancelResetLink", cancelResetLink
                , "credentialKeyExpireInMinutes", String.valueOf(commonService.getCredentialKeyExpireInMinutes())
        );

        mail.setText(composeBody(params, "emails/forgot-password"));
        return mail;
    }

    public boolean sendRegisterEmail(RegisterRequest request, String activationCode) {
        return send(accountRegisterMail(request, toUrl(UserAction.ACCOUNT_ACTIVATION, activationCode)));
    }

    public boolean sendPreEnrollmentSubmitEmail(User user, PreEnrollmentSubmitRequest request) {
        return send(preEnrollmentSubmit(user, request));
    }

    public boolean sendPasswordForgotEmail(String email, String key) {
        return send(forgetPasswordMail(email, toUrl(UserAction.RESET_PASSWORD, key), toUrl(UserAction.CANCEL_RESET_PASSWORD, key)));
    }

    private boolean send(SimpleMailMessage message) {
        boolean sent = true;
        try {
            final MimeMessageHelper helper =
                    new MimeMessageHelper(mailSender.createMimeMessage(), true, "UTF-8"); // true = multipart
            helper.setSubject(message.getSubject());
            helper.setFrom(message.getFrom());
            helper.setTo(message.getTo());
            helper.setText(message.getText(), true);
            mailSender.send(helper.getMimeMessage());
            sent = true;
        } catch (Exception e) {
//            //todo: fran create failover process to manage this
            logger.error("Error while sending email", e);
        }
        return sent;

    }


    /*
        public void sendUserForgotEmail(String email) {
            send(forgetUserMail(email));
        }

        private SimpleMailMessage forgetUserMail(String to) {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(fromEmail);
            mail.setTo(to);
            mail.setSubject("Registro en Linea - Olvido Usuario");
            return mail;
        }
    */


}