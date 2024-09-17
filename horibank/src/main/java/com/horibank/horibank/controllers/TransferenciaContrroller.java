package com.horibank.horibank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horibank.horibank.domain.record.HistoricoTransferencia;
import com.horibank.horibank.services.TransferenciaService;

@RestController
@RequestMapping("/api/transferencia")
public class TransferenciaContrroller {

    @Autowired
    TransferenciaService transferenciaService;

    @GetMapping("/historico/{id}")
    public ResponseEntity<?> GetHistoricoTranferenciasConta(@PathVariable("id") String id) {
        List<HistoricoTransferencia> historicoTransferencias = null; 
        
        try {
            historicoTransferencias = transferenciaService.HistoricoTransferenciasDaConta(Integer.parseInt(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    
        return ResponseEntity.ok(historicoTransferencias); 
    }
}
