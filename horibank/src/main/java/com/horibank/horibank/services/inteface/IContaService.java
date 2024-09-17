package com.horibank.horibank.services.inteface;

import java.util.List;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.Pessoa;
import com.horibank.horibank.domain.enums.TipoConta;
import com.horibank.horibank.domain.record.ContaPessoa;

public interface IContaService {
    void CadastrarConta(Conta conta);
    List<Conta> ObterContas(String id);
    Conta ObterConta(String id);
    void AtualizarConta(Conta conta);
    Conta ObterContaPorNumeroDigitoTipoConta(Integer numero, Integer digito, TipoConta tipoConta);
    ContaPessoa CriarContaPessoa(Conta conta, Pessoa pessoa);

}
