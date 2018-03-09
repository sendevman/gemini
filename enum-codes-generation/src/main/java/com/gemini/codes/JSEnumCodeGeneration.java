package com.gemini.codes;

import com.gemini.codes.services.CodeService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 2/5/18
 * Time: 4:46 PM
 */

@SpringBootApplication
public class JSEnumCodeGeneration implements CommandLineRunner {
    private static Logger logger = Logger.getLogger(JSEnumCodeGeneration.class);


    @Autowired
    CodeService codeService;

    public static void main(String[] args) {
        SpringApplication.run(JSEnumCodeGeneration.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(new File(".").getAbsoluteFile());
        if (args == null || args.length == 0)
            throw new RuntimeException("Process cannot run if there is not a directory output specify");
        String location = args[0];
//        FileSystemUtils.deleteRecursively(new File(location + "/"));
//        new File(location).mkdir();
        System.out.println(args[0]);
//        /Users/fran/Documents/Projects/UpperCase/project-gemini/webapp/src/forms/data

        constructCodeJS(location, "residentialStatus", "ENUM_CE_RESIDENTIAL_STATUS");
        constructCodeJS(location, "municipios", "ENUM_CE_MUNICIPALITY_CODE");
        constructCodeJS(location, "relationTypes", "ENUM_CE_RELATION_CODE");
        constructCodeJS(location, "ethnicCodes", "ENUM_CE_ETHNIC_CODE");
        constructCodeJS(location, "countries", "ENUM_CE_BIRTH_COUNTRY");
        constructCodeJS(location, "states", "ENUM_CE_BIRTH_STATE");
        constructCodeJS(location, "educationLevels", "ENUM_CE_EDUCATION_CODE");
        constructCodeJS(location, "disabilityCodes", "ENUM_SE_DISABILITY_CODES");
        constructCodeJS(location, "languageCodes", "ENUM_CE_LANGUAGE_CODE");
        constructCodeJS(location, "transportationTypes", "ENUM_ST_TRANSPORTATION_TYPE");
        constructCodeJS(location, "contactTypes", "ENUM_ST_CONTACT_TYPE");
        constructCodeJS(location, "schoolTypes", "ENUM_SY_SCHOOL_TYPE");
        constructCodeJS(location, "foodOptions", "ENUM_CE_ECONOMY_CODE");
        constructCodeJS(location, "medicalConditions", "ENUM_HE_ALERT_TYPE");
        constructCodeJS(location, "medicationCodes", "ENUM_HE_MEDICATION_CODE");
        constructCodeJS(location, "medicationDosages", "ENUM_HE_MEDICATION_DOSAGES");
        constructCodeJS(location, "medicationRoutes", "ENUM_HE_MEDICATION_ROUTES");
        constructCodeJS(location, "jobType", "ENUM_CE_EMPLOYER_STATUS");

    }

    private void constructCodeJS(String baseLocation, String jsCodeName, String enumTable) {
        List<String> codes = codeService.getCodesForTable(enumTable);

        for (String code : codes) {
            Path path = Paths.get(String.format("%s/%s.js", baseLocation, jsCodeName));
            try {
                int index = codes.indexOf(code);
                int lastIndex = codes.size() - 1;
                String line = index == 0
                        ? String.format("module.exports =  [", jsCodeName).concat(code)
                        : code;
                line = line.concat(index < lastIndex ? "," : "];").concat("\n");
                Files.write(path, line.getBytes(), StandardOpenOption.APPEND, StandardOpenOption.CREATE);
            } catch (Exception e) {
                logger.error("error writing file " + e);
            }
        }


    }
}
