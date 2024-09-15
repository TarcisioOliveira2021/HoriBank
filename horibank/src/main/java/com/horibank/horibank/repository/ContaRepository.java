package com.horibank.horibank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.horibank.horibank.domain.Conta;
import java.util.List;

public interface ContaRepository extends JpaRepository<Conta, Integer> {
        List<Conta> findByIdPessoa(Integer id);
}
