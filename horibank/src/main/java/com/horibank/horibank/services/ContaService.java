package com.horibank.horibank.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.Pessoa;
import com.horibank.horibank.domain.enums.TipoConta;
import com.horibank.horibank.domain.record.ContaPessoa;
import com.horibank.horibank.repository.ContaRepository;
import com.horibank.horibank.repository.PessoaRepository;
import com.horibank.horibank.services.inteface.IContaService;
@Service
public class ContaService implements IContaService{
    
    @Autowired
    ContaRepository contaRepository;

    @Autowired
    PessoaRepository pessoaRepository;

   
    public void CadastrarConta(Conta conta) {

        if(ValidarQuantidadeContas(conta.getIdPessoa())){
            throw new RuntimeException("Quantidade de contas excedida");
        }

        if(ValidarContaExistente(conta)){
            throw new RuntimeException("Conta já cadastrada");
        }
        
        contaRepository.save(conta);
    }

    public List<Conta> ObterContas(String id) {
        return contaRepository.findByIdPessoa(Integer.parseInt(id));
    }

    private boolean ValidarQuantidadeContas(Integer idPessoa) {
        int quantidadeContas = pessoaRepository.findById(idPessoa).get().getContas().size();
        System.err.println("QUANTIDADE DE CONTAS:"+quantidadeContas);
        return quantidadeContas == 2;
    }

    public Conta ObterConta(String id) {
        return contaRepository.findById(Integer.parseInt(id)).get();
    }

    public void AtualizarConta(Conta conta) {
        contaRepository.save(conta);
    }

    public Conta ObterContaPorNumeroDigitoTipoConta(Integer numero, Integer digito, TipoConta tipoConta) {
        return contaRepository.findByNumeroAndDigitoAndTipoConta(numero, digito, tipoConta);
    }

    private boolean ValidarContaExistente(Conta conta) {
        Conta contaExistente = contaRepository.findByNumeroAndDigitoAndTipoConta(conta.getNumero(), conta.getDigito(), conta.getTipoConta());
        return contaExistente != null;
    }

    public ContaPessoa CriarContaPessoa(Conta conta, Pessoa pessoa) {
        return new ContaPessoa(
                conta.getId().toString(),
                pessoa.getId().toString(),
                conta.getNumero() + "-" + conta.getDigito(),
                conta.getTipoConta().toString(),
                pessoa.getNome()
        );
    }

    
}
