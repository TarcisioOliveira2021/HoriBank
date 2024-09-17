package com.horibank.horibank.services.inteface;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.Pessoa;

public interface IPessoaService {
    Pessoa ObterPessoaPeloCPF(String cpf);
    Pessoa ObterPessoaPeloId(Integer id);
    void CadastrarContaPessoa(Integer idPessoa, Conta conta);
    void CadastrarPessoa(Pessoa pessoa);
}
