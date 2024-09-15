package com.horibank.horibank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horibank.horibank.domain.Pessoa;
import com.horibank.horibank.domain.record.Usuario;
import com.horibank.horibank.services.inteface.IPessoaService;

@RestController
@RequestMapping("/api/pessoa")
public class PessoaController {

    @Autowired
    IPessoaService pessoaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> CadastrarPessoa(@RequestBody Pessoa pessoa) {

        try {
            pessoaService.CadastrarPessoa(pessoa);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Erro ao cadastrar pessoa" + e.getMessage());
        }

        return ResponseEntity.ok("Pessoa cadastrada com sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario dados) {
        Pessoa pessoa = null;

        try {
            pessoa = pessoaService.ObterPessoaPeloCPF(dados.senha());

            if(pessoa == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Usuário não encontrado");
            }
            
            if(!pessoa.getNome().equals(dados.nome())){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Usuário ou senha inválidos");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Erro ao logar: " + e.getMessage());
        }

        return ResponseEntity.ok(pessoa);
    }
    
    
}
