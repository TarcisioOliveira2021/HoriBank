package com.horibank.horibank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.horibank.horibank.services.inteface.IPessoaService;
import com.horibank.horibank.domain.Pessoa;
import com.horibank.horibank.repository.PessoaRepository;

@Service
public class PessoaService implements IPessoaService {

    @Autowired
    PessoaRepository pessoaRepository;

    public void CadastrarPessoa(Pessoa pessoa) {
        pessoaRepository.save(pessoa);
    }

    public Pessoa ObterPessoaPeloCPF(String cpf) {
        System.out.println("CPF:"  + cpf);
        return pessoaRepository.findBynuCpf(cpf);
    }
}
