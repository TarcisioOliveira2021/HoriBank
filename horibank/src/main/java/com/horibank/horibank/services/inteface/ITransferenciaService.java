package com.horibank.horibank.services.inteface;

import java.util.List;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.record.HistoricoTransferencia;

public interface ITransferenciaService {
        void Transferir(Conta contaOrigem, Conta contaDestino, Double valor);
        List<HistoricoTransferencia> HistoricoTransferenciasDaConta(Integer idConta);
}
