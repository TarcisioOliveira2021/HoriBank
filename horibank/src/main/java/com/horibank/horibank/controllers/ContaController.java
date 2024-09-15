package com.horibank.horibank.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.enums.TipoConta;
import com.horibank.horibank.domain.record.ContaRecord;
import com.horibank.horibank.services.inteface.IContaService;

import io.micrometer.core.ipc.http.HttpSender.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;


@RestController
@RequestMapping("/api/conta")
public class ContaController {

    @Autowired
    IContaService contaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> CadastraConta(@RequestBody ContaRecord dados) {
        System.out.println(dados);
        // try {
            Conta conta = new Conta(
                (Integer) Integer.parseInt(dados.idPessoa()), 
                Integer.parseInt(dados.numero()), 
                Integer.parseInt(dados.digito()), 
                0.00, 
                TipoConta.valueOf(dados.tipoConta())
            );

            System.out.println(conta.toString());
        //     contaService.CadastrarConta(conta);
        // } catch (Exception e) {
        //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        //     .body(e.getMessage());
        // }
        return ResponseEntity.ok("Conta cadastrada com sucesso");
    }

    @PostMapping("/obterconta")
    public ResponseEntity<?> ObterConta(@RequestBody String id) {

    List<Conta> conta = null;

    try {
        conta = contaService.ObterConta(id);

        if (conta == null || conta.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Cliente não possui conta");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Erro ao obter conta: \n" + e.getMessage());
    }

    return ResponseEntity.ok(conta);
}
}
