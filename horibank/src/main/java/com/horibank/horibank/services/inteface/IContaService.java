package com.horibank.horibank.services.inteface;

import com.horibank.horibank.domain.Conta;
import java.util.List;

public interface IContaService {
    void CadastrarConta(Conta conta);
    List<Conta> ObterConta(String id);
}
