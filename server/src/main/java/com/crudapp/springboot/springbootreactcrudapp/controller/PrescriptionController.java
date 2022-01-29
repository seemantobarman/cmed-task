package com.crudapp.springboot.springbootreactcrudapp.controller;

import com.crudapp.springboot.springbootreactcrudapp.exception.ResourceNotFoundException;
import com.crudapp.springboot.springbootreactcrudapp.model.Prescription;
import com.crudapp.springboot.springbootreactcrudapp.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @GetMapping("/v1/prescription")
    public List<Prescription> getAllPrescriptions(){
        return prescriptionRepository.findAll();
    }

    @PostMapping("/create")
    public Prescription createPrescription(@Validated @RequestBody Prescription prescription){
        return prescriptionRepository.save(prescription);
    }

    @GetMapping("/prescription/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        Prescription prescription = prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found"));
        return ResponseEntity.ok().body(prescription);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable(value = "id") long id, @RequestBody Prescription prescriptionDetails) throws ResourceNotFoundException {
        Prescription prescription = prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found"));

        prescription.setName(prescriptionDetails.getName());
        prescription.setAge(prescriptionDetails.getAge());
        prescription.setGender(prescriptionDetails.getGender());
        prescription.setDiagnosis(prescriptionDetails.getDiagnosis());
        prescription.setMedications(prescriptionDetails.getMedications());
        prescription.setPrescriptionDate(prescriptionDetails.getPrescriptionDate());
        prescription.setNextVisitDate(prescriptionDetails.getNextVisitDate());
        prescriptionRepository.save(prescription);

        return ResponseEntity.ok().body(prescription);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deletePrescription(@PathVariable(value = "id") long id) throws ResourceNotFoundException {
        prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not Found"));

        prescriptionRepository.deleteById(id);

        return ResponseEntity.ok().build();

    }

}
