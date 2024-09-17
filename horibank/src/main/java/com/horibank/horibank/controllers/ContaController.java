package com.horibank.horibank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.enums.TipoConta;
import com.horibank.horibank.domain.record.ContaPessoa;
import com.horibank.horibank.domain.record.ContaRecord;
import com.horibank.horibank.domain.record.Deposito;
import com.horibank.horibank.domain.record.Saque;
import com.horibank.horibank.services.inteface.IContaService;
import com.horibank.horibank.services.inteface.IPessoaService;
import com.horibank.horibank.services.inteface.ITransferenciaService;



@RestController
@RequestMapping("/api/conta")
public class ContaController {

    @Autowired
    IContaService contaService;

    @Autowired
    IPessoaService pessoaService;

    @Autowired
    ITransferenciaService transferenciaService;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> CadastraConta(@RequestBody ContaRecord dados) {
        try {
            
            Conta conta = new Conta(
                (Integer) Integer.parseInt(dados.idPessoa()), 
                Integer.parseInt(dados.numero()), 
                Integer.parseInt(dados.digito()), 
                0.00, 
                TipoConta.valueOf(dados.tipoConta())
            );
            contaService.CadastrarConta(conta);
            pessoaService.CadastrarContaPessoa((Integer) Integer.parseInt(dados.idPessoa()), conta);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(e.getMessage());
        }
        return ResponseEntity.ok("Conta cadastrada com sucesso");
    }

    @GetMapping("/obtercontas/{id}")
    public ResponseEntity<?> ObterContas(@PathVariable("id") String id) {
        List<Conta> conta = null;
        try {
            conta = contaService.ObterContas(id);

            if (conta == null || conta.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Cliente não possui conta");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }

        return ResponseEntity.ok(conta);
    }

    @GetMapping("/obterconta/{id}")
    public ResponseEntity<?> ObterConta(@PathVariable("id") String id) {
        Conta conta = null;
        
        try {
            conta = contaService.ObterConta(id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }

        return ResponseEntity.ok(conta);
    }

    @PostMapping("/depositar")
    public ResponseEntity<?> Deposito(@RequestBody Deposito deposito) {
        var valor = Double.parseDouble(deposito.valor());

        try {
            var conta = contaService.ObterConta(deposito.idConta());
            conta.Depositar(valor);
            contaService.AtualizarConta(conta);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }

        return ResponseEntity.ok("Deposito realizado com sucesso");
    }

    @PostMapping("/sacar")
    public ResponseEntity<?> Sacar(@RequestBody Saque saque) {

        try {
            var conta = contaService.ObterConta(saque.idConta());
            conta.Sacar(Double.parseDouble(saque.valor()));
            contaService.AtualizarConta(conta);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }

        return ResponseEntity.ok("Saque realizado com sucesso");
    }

    @GetMapping("/obtercontapornumero/{numeroConta}/{tipoConta}")
    public ResponseEntity<?> obterContaPorNumero(@PathVariable("numeroConta") String numeroConta, @PathVariable("tipoConta") String tipoConta) {
        var numero = Integer.parseInt(numeroConta.split("-")[0]);
        var digito = Integer.parseInt(numeroConta.split("-")[1]);
        var tipo = TipoConta.valueOf(tipoConta);
        Conta conta = null;
        ContaPessoa contaPessoa = null;

        try {
            conta = contaService.ObterContaPorNumeroDigitoTipoConta(numero, digito, tipo);
            
            if(conta == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Conta não encontrada");
            }
            
            var pessoa = pessoaService.ObterPessoaPeloId(conta.getIdPessoa());
            contaPessoa = contaService.CriarContaPessoa(conta, pessoa);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }

        return ResponseEntity.ok(contaPessoa);
    }

    @PostMapping("/transferir")
    public ResponseEntity<?> Transferir(@RequestBody com.horibank.horibank.domain.record.Transferencia transferencia) {
        try {
            var contaOrigem = contaService.ObterConta(transferencia.idContaOrigem());
            var contaDestino = contaService.ObterConta(transferencia.idContaDestino());
            transferenciaService.Transferir(contaOrigem, contaDestino, (Double) Double.parseDouble(transferencia.valor()));

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
        }

        return ResponseEntity.ok("Transferencia realizada com sucesso");
    }
}
