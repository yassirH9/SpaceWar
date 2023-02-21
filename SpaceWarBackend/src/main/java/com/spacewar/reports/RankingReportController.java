package com.spacewar.reports;


import com.spacewar.entity.models.Achivement;
import com.spacewar.entity.models.MasterAchivement;
import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.models.Users;
import com.spacewar.entity.services.impl.AchivementService;
import com.spacewar.entity.services.impl.MasterAchivementService;
import com.spacewar.entity.services.impl.RankingService;
import com.spacewar.entity.services.impl.UserService;
import com.spacewar.reports.payload.AchivementUserReport;
import com.spacewar.reports.payload.RankingUserReport;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.fill.JRFillChart;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.text.DecimalFormat;
import java.util.*;

//imports para usar el servicio SMTP


@RestController
//@Api(tags = "rankingsReports")
@CrossOrigin(value = "*")
@RequestMapping("/api")
public class RankingReportController {
    @Autowired
    private RankingService rankingService;
    @Autowired
    private UserService userService;
    @Autowired
    private AchivementService achivementService;
    @Autowired
    private MasterAchivementService masterAchivementService;

    @GetMapping("/report")
    public ResponseEntity<Resource> getReport() throws JRException, FileNotFoundException {
        final File template = ResourceUtils.getFile("src/main/java/com/spacewar/reports/templates/ReportTemplate.jasper");
        final JasperReport report = (JasperReport) JRLoader.loadObject(template);

        List<RankingUserReport> rpData = new ArrayList<>();

        rankingService.getAll().forEach((x)->{
            rpData.add(new RankingUserReport(x.getUserplid().getPLID(),x.getUserplid().getMAIL(),x.getUserplid().getNICKNAME(),x.getPOINTS()));
        });

        final HashMap<String,Object> parameters = new HashMap<>();
        parameters.put("ds", new JRBeanCollectionDataSource((Collection<?>) rpData));
        parameters.put("Logo", new FileInputStream("src/main/java/com/spacewar/reports/templates/spaceship.png"));
        JasperPrint jasperPrint = JasperFillManager.fillReport(report,parameters,new JRBeanCollectionDataSource(rpData));//(new jrempty) usado para pasar los field para el chart
        byte[] response = JasperExportManager.exportReportToPdf(jasperPrint);

        StringBuilder strBuilder = new StringBuilder().append("RankingReportPDF:");
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                .filename(".pdf").build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(contentDisposition);
        return ResponseEntity.ok().contentLength((long) response.length)
                .contentType(MediaType.APPLICATION_PDF)
                .headers(headers)
                .body(new ByteArrayResource(response));
    }
    @GetMapping("/report/chart")
    public ResponseEntity<Resource> getReportChart() throws JRException, FileNotFoundException {
        final File template = ResourceUtils.getFile("src/main/java/com/spacewar/reports/templates/ReportTemplateChart.jasper");
        final JasperReport report = (JasperReport) JRLoader.loadObject(template);

        List<RankingUserReport> rpData = new ArrayList<>();

        rankingService.getAll().forEach((x)->{
            rpData.add(new RankingUserReport(x.getUserplid().getPLID(),x.getUserplid().getMAIL(),x.getUserplid().getNICKNAME(),x.getPOINTS()));
        });

        final HashMap<String,Object> parameters = new HashMap<>();
        parameters.put("ds", new JRBeanCollectionDataSource((Collection<?>) rpData));
        parameters.put("Logo", new FileInputStream("src/main/java/com/spacewar/reports/templates/spaceship.png"));
        JasperPrint jasperPrint = JasperFillManager.fillReport(report,parameters,new JRBeanCollectionDataSource(rpData));//(new jrempty) usado para pasar los field para el chart
        byte[] response = JasperExportManager.exportReportToPdf(jasperPrint);

        StringBuilder strBuilder = new StringBuilder().append("RankingReportPDF:");
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                .filename(".pdf").build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(contentDisposition);
        return ResponseEntity.ok().contentLength((long) response.length)
                .contentType(MediaType.APPLICATION_PDF)
                .headers(headers)
                .body(new ByteArrayResource(response));
    }
    @GetMapping("/report/platinum/{plid}")
    public ResponseEntity<Resource> getReportPlatinumAchivement(@PathVariable(value = "plid") Long PLID) throws JRException, FileNotFoundException {
        final File template = ResourceUtils.getFile("src/main/java/com/spacewar/reports/templates/PlatinumReport.jasper");
        final JasperReport report = (JasperReport) JRLoader.loadObject(template);
        //datos que van a rellenar el reporte
        List<AchivementUserReport> rpData = new ArrayList<>();

        //almacena el usuario del que se va a emitir el reporte
        Users user = userService.get(PLID);
        //alamcena la lista de logros;
        List<MasterAchivement> masterAchList = masterAchivementService.getAll();
        //almacena los logros del usuario pasado por parametro
        List<Achivement> userAchivementList = new ArrayList<>();
        //filtra los achivement que tiene el usuario del que se va a emitir el reporte
        List<Achivement> userAchivementList_ = achivementService.getAll();
        userAchivementList_.forEach((x)->{
            if(x.getUserm().getPLID() == user.getPLID()){
                userAchivementList.add(x);
            }
        });

        Float achCantidad = (float) userAchivementList.size();
        Float masterachCantidad = (float) masterAchList.size();
        float percent = (achCantidad/masterachCantidad)*100;
        DecimalFormat formato = new DecimalFormat("0.0");
        String result = formato.format(percent);
        result +="%";
        AchivementUserReport arc = new AchivementUserReport(user.getPLID(),user.getNICKNAME(),0,result,user.getMAIL());
        rpData.add(arc);

        final HashMap<String,Object> parameters = new HashMap<>();
        parameters.put("ds", new JRBeanCollectionDataSource((Collection<?>) rpData));
        parameters.put("Logo", new FileInputStream("src/main/java/com/spacewar/reports/templates/spaceship.png"));
        parameters.put("CONGRAT", new FileInputStream("src/main/java/com/spacewar/reports/templates/congratulations.png"));

        JasperPrint jasperPrint = JasperFillManager.fillReport(report,parameters,new JRBeanCollectionDataSource(rpData));//(new jrempty) usado para pasar los field para el chart
        byte[] response = JasperExportManager.exportReportToPdf(jasperPrint);

        StringBuilder strBuilder = new StringBuilder().append("AchivementReportPDF:");
        ContentDisposition contentDisposition = ContentDisposition.builder("attachment")
                .filename(".pdf").build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(contentDisposition);
        return ResponseEntity.ok().contentLength((long) response.length)
                .contentType(MediaType.APPLICATION_PDF)
                .headers(headers)
                .body(new ByteArrayResource(response));
    }
    @GetMapping("/report/achivement/{plid}")
    public ResponseEntity<Resource> getReportSchivement(@PathVariable(value = "plid") Long PLID) throws JRException, FileNotFoundException {
        return null;
    }
//    @Autowired
//    private JavaMailSender javaMailSender;

//    @GetMapping("/report/send/{email}")
//    public void sendReport(@PathVariable(value = "email") String email) throws MessagingException, FileNotFoundException, JRException {
//        final File template = ResourceUtils.getFile("src/main/java/com/spacewar/reports/templates/ReportTemplate.jasper");
//        final JasperReport report = (JasperReport) JRLoader.loadObject(template);
//
//        List<RankingUserReport> rpData = new ArrayList<>();
//
//        rankingService.getAll().forEach((x)->{
//            rpData.add(new RankingUserReport(x.getUserplid().getPLID(),x.getUserplid().getMAIL(),x.getUserplid().getNICKNAME(),x.getPOINTS()));
//        });
//
//        final HashMap<String,Object> parameters = new HashMap<>();
//        parameters.put("ds", new JRBeanCollectionDataSource((Collection<?>) rpData));
//        parameters.put("Logo", new FileInputStream("src/main/java/com/spacewar/reports/templates/spaceship.png"));
//        JasperPrint jasperPrint = JasperFillManager.fillReport(report,parameters,new JRBeanCollectionDataSource(rpData));//(new jrempty) usado para pasar los field para el chart
//        byte[] response = JasperExportManager.exportReportToPdf(jasperPrint);
//
//
//        //
//        //Generar correo electronico
//        //
//        MimeMessage message = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//        helper.setTo(email);
//        helper.setSubject("Public ranking report");
//        helper.setText("This is a autogenerated email please do not respond.");
//
//        helper.addAttachment("RankingReport.pdf", new ByteArrayResource(response));
//        javaMailSender.send(message);
//    }
//    @GetMapping("/report/send/chart/{email}")
//    public void sendReportChart(@PathVariable(value = "email") String email) throws MessagingException, FileNotFoundException, JRException {
//        final File template = ResourceUtils.getFile("src/main/java/com/spacewar/reports/templates/ReportTemplateChart.jasper");
//        final JasperReport report = (JasperReport) JRLoader.loadObject(template);
//
//        List<RankingUserReport> rpData = new ArrayList<>();
//
//        rankingService.getAll().forEach((x)->{
//            rpData.add(new RankingUserReport(x.getUserplid().getPLID(),x.getUserplid().getMAIL(),x.getUserplid().getNICKNAME(),x.getPOINTS()));
//        });
//
//        final HashMap<String,Object> parameters = new HashMap<>();
//        parameters.put("ds", new JRBeanCollectionDataSource((Collection<?>) rpData));
//        parameters.put("Logo", new FileInputStream("src/main/java/com/spacewar/reports/templates/spaceship.png"));
//        JasperPrint jasperPrint = JasperFillManager.fillReport(report,parameters,new JRBeanCollectionDataSource(rpData));//(new jrempty) usado para pasar los field para el chart
//        byte[] response = JasperExportManager.exportReportToPdf(jasperPrint);


        //
        //Generar correo electronico
        //
//        MimeMessage message = javaMailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true);
//        helper.setTo(email);
//        helper.setSubject("Public ranking report");
//        helper.setText("This is a autogenerated email please do not respond.");
//
//        helper.addAttachment("RankingReportChart.pdf", new ByteArrayResource(response));
//        javaMailSender.send(message);
//    }
}
