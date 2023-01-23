package com.spacewar.reports;


import com.spacewar.entity.models.Ranking;
import com.spacewar.entity.services.impl.RankingService;
import com.spacewar.entity.services.impl.UserService;
import com.spacewar.reports.payload.RankingUserReport;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.fill.JRFillChart;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.*;

@RestController
//@Api(tags = "rankingsReports")
@CrossOrigin(value = "*")
@RequestMapping("/api")
public class RankingReportController {
    @Autowired
    private RankingService rankingService;
    @Autowired
    private UserService userService;

    @GetMapping("/report")
    public ResponseEntity<Resource> getReport() throws JRException, FileNotFoundException {
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
}
