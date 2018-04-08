package com.gemini.admin.security;

/**
 * Created with IntelliJ IDEA.
 * User: fran
 * Date: 4/7/18
 * Time: 1:50 AM
 */


/*
    3641	SIE
    5163	Estadisticos y SAPDE
    4862	Especialistas Enlaces
    2660	Especialistas
    5645	Recursos Humanos - Solo Lectura
    5985	Ayudante Especial
    6928	Educación Ocupacional y Técnica - Editar
    6325	Educación Ocupacional y Técnica
    2620	Director Escolar
    6625	Director Escolar Destaque
    3642	Directores Regionales y Superintendentes
    7908	Directores Regionales

    4242	Disciplina
    7947	Director Centro Homeless
*/
public enum Authorities {
    DE_CENTRAL("SIE", 3641L),
    STATISTICAL_CLECK("Estadisticos y SAPDE", 5163L),
    SCHOOL_DIRECTOR("Director Escolar Destaque", 6625L, 2620L);

    String sieRole;
    Long sieRoleIds[];

    Authorities(String sieRolem, Long ...roles) {
        this.sieRole = sieRole;
        this.sieRoleIds = roles;
    }

    public String getSieRole() {
        return sieRole;
    }

    public Long[] getSieRoleIds() {
        return sieRoleIds;
    }
}