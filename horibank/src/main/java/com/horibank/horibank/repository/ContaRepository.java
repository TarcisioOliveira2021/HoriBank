package com.horibank.horibank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.horibank.horibank.domain.Conta;
import com.horibank.horibank.domain.enums.TipoConta;

public interface ContaRepository extends JpaRepository<Conta, Integer> {
        List<Conta> findByIdPessoa(Integer id);
        Conta findByNumeroAndDigito(Integer numero, Integer digito);
        Conta findByNumeroAndDigitoAndTipoConta(Integer numero, Integer digito, TipoConta tipoConta);
}
