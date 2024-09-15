package com.horibank.horibank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.repository.ContaRepository;
import com.horibank.horibank.repository.PessoaRepository;
import com.horibank.horibank.services.inteface.IContaService;
import java.util.List;
@Service
public class ContaService implements IContaService{
    
    @Autowired
    ContaRepository contaRepository;

    @Autowired
    PessoaRepository pessoaRepository;

    public void CadastrarConta(Conta conta) {

        if(!ValidarQuantidadeContas(conta.getIdPessoa())){
            throw new RuntimeException("Quantidade de contas excedida");
        }
        
        contaRepository.save(conta);
    }

    public List<Conta> ObterConta(String id) {
        return contaRepository.findByIdPessoa(Integer.parseInt(id));
    }

    private boolean ValidarQuantidadeContas(Integer idPessoa) {
        int quantidadeContas = pessoaRepository.findById(idPessoa).get().getContas().size();

        if(quantidadeContas == 2){
            return false;
        }

        return true;
    }
}
