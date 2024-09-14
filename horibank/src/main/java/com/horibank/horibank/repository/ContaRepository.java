package com.horibank.horibank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.horibank.horibank.domain.Conta;

public interface ContaRepository extends JpaRepository<Conta, Integer> {

}
