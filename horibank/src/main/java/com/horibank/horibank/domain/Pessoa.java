package com.horibank.horibank.domain;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "pessoa")
public class Pessoa {
    @Id
    @GeneratedValue
    private Integer id;
    private String nuCpf;
    private String nome;
    private String telefone;

    @OneToMany
    private List<Conta> conta;

    public Pessoa() {
    }
    
    public Pessoa(String nuCpf, String nome, String telefone, List<Conta> conta) {
        this.nuCpf = nuCpf;
        this.nome = nome;
        this.telefone = telefone;
        this.conta = conta;
    }

    public Integer getId() {
        return id;
    }

    public List<Conta> getContas() {
        return conta;
    }

    public String getNuCpf() {
        return nuCpf;
    }

    public String getNome() {
        return nome;
    }

    public String getTelefone() {
        return telefone;
    }
}
