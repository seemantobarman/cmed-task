package com.crudapp.springboot.springbootreactcrudapp.repository;

import com.crudapp.springboot.springbootreactcrudapp.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionRepository extends JpaRepository <Prescription, Long> {
}
