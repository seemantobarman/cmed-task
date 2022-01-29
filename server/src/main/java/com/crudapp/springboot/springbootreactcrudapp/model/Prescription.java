package com.crudapp.springboot.springbootreactcrudapp.model;

import javax.persistence.*;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private Double age;

    @Column(name = "gender")
    private String gender;


    @Column(name = "diagnosis", length = 500)
    private String diagnosis;

    @Column(name = "medications", length = 500)
    private String medications;

    @Column(name = "prescriptionDate")
    private String prescriptionDate;

    @Column(name = "nextVisitDate")
    private String nextVisitDate;

    public Prescription() {
        super();
    }

    public Prescription(long id, String name, Double age, String gender, String diagnosis, String medications, String prescriptionDate, String nextVisitDate) {
        super();
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.diagnosis = diagnosis;
        this.medications = medications;
        this.prescriptionDate = prescriptionDate;
        this.nextVisitDate = nextVisitDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAge() {
        return age;
    }

    public void setAge(Double age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getMedications() {
        return medications;
    }

    public void setMedications(String medications) {
        this.medications = medications;
    }

    public String getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(String prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    public String getNextVisitDate() {
        return nextVisitDate;
    }

    public void setNextVisitDate(String nextVisitDate) {
        this.nextVisitDate = nextVisitDate;
    }

}
