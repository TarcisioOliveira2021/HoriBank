package com.horibank.horibank.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.Transferencia;
import com.horibank.horibank.domain.record.HistoricoTransferencia;
import com.horibank.horibank.repository.ContaRepository;
import com.horibank.horibank.repository.PessoaRepository;
import com.horibank.horibank.repository.TransferenciaRepository;
import com.horibank.horibank.services.inteface.ITransferenciaService;

@Service
public class TransferenciaService implements ITransferenciaService {

    @Autowired
    TransferenciaRepository transferenciaRepository;

    @Autowired
    ContaRepository contaRepository;

    @Autowired
    PessoaRepository pessoaRepository;

    public void Transferir(Conta contaOrigem, Conta contaDestino, Double valor) {
        contaOrigem.Sacar(valor);
        contaDestino.Depositar(valor);
        CriarTransferencia(contaOrigem.getId(), contaDestino.getId(), valor);

        contaRepository.save(contaOrigem);
        contaRepository.save(contaDestino);
    }

    private void CriarTransferencia(Integer idContaOrigem, Integer idContaDestino, Double valor) {
        LocalDateTime dataHoraAtual = LocalDateTime.now();

        transferenciaRepository.save(
                new Transferencia(
                        idContaOrigem,
                        idContaDestino,
                        valor,
                        dataHoraAtual
                )
        );
    }

    public List<HistoricoTransferencia> HistoricoTransferenciasDaConta(Integer idConta) {
        List<HistoricoTransferencia> historicoTransferencias = new ArrayList<>();

        List<Transferencia> transferencias = transferenciaRepository.findAll().stream()
                .filter(transferencia -> transferencia.getIdContaOrigem().equals(idConta))
                .toList();

        System.out.println("Lista não vai ser vazia: " + transferencias.size());

        for (Transferencia transferencia : transferencias) {
            var data = transferencia.getData().toString().split("T")[0];
            var hora = transferencia.getData().toString().split("T")[1].split("\\.")[0];

            historicoTransferencias.add(new HistoricoTransferencia(
                    transferencia.getId(),
                    pessoaRepository.findById(contaRepository.findById(idConta).get().getIdPessoa()).get().getNome(),
                    transferencia.getValor(),
                    data,
                    hora,
                    contaRepository.findById(transferencia.getIdContaDestino()).get().getTipoConta().toString()
            )
            );
        }

        return historicoTransferencias;
    }
}
