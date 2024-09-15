package com.horibank.horibank.services.inteface;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.Pessoa;

public interface IPessoaService {
    void CadastrarPessoa(Pessoa pessoa);
    Pessoa ObterPessoaPeloCPF(String cpf);
    void CadastrarContaPessoa(Integer idPessoa, Conta conta);
}
