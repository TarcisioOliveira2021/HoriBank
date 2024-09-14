package com.horibank.horibank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horibank.horibank.domain.Pessoa;
import com.horibank.horibank.services.inteface.IPessoaService;;


@RestController
@RequestMapping("/api/pessoa")
public class PessoaController {

    @Autowired
    IPessoaService pessoaService;

    @PostMapping("/cadastrar")
    public String CadastrarPessoa(Pessoa pessoa) {
        
        try {
            pessoaService.CadastrarPessoa(pessoa);
        } catch (Exception e) {
            return "Erro ao cadastrar pessoa: " + e.getMessage();
        }

        return "Pessoa cadastrada com sucesso!" + pessoa.toString();
    }
    
}
