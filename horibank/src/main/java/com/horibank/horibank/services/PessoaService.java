package com.horibank.horibank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.Pessoa;
import com.horibank.horibank.repository.PessoaRepository;
import com.horibank.horibank.services.inteface.IPessoaService;

@Service
public class PessoaService implements IPessoaService {

    @Autowired
    PessoaRepository pessoaRepository;

    public void CadastrarPessoa(Pessoa pessoa) {

        if(ValidarPessoaExistente(pessoa)){
            throw new RuntimeException("Pessoa já cadastrada");
        }

        pessoaRepository.save(pessoa);
    }

    public Pessoa ObterPessoaPeloCPF(String cpf) {
        System.out.println("CPF:"  + cpf);
        return pessoaRepository.findBynuCpf(cpf);
    }

    public void CadastrarContaPessoa(Integer idPessoa, Conta conta) {
        Pessoa pessoa = pessoaRepository.findById(idPessoa).get();
        pessoa.getContas().add(conta);
        pessoaRepository.save(pessoa);
    }

    private boolean ValidarPessoaExistente(Pessoa pessoa) {
        Pessoa pessoaExistente = pessoaRepository.findBynuCpf(pessoa.getNuCpf());
        return pessoaExistente != null;
    }

    public Pessoa ObterPessoaPeloId(Integer id) {
        return pessoaRepository.findById(id).get();
    }
}
