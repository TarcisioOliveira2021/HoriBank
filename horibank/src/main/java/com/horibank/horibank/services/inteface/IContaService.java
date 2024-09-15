package com.horibank.horibank.services.inteface;

import com.horibank.horibank.domain.Conta;
import java.util.List;

public interface IContaService {
    void CadastrarConta(Conta conta);
    List<Conta> ObterContas(String id);
    Conta ObterConta(String id);
    void AtualizarConta(Conta conta);
}
