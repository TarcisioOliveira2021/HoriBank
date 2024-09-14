package com.horibank.horibank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.horibank.horibank.domain.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {
}
