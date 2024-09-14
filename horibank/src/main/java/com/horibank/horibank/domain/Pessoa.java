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
    private int nuCpf;
    private String nome;
    private String telefone;

    @OneToMany
    private List<Conta> conta;
    
    public Pessoa() {
    }

    public Pessoa(int nuCpf, String nome, String telefone, List<Conta> conta) {
        this.nuCpf = nuCpf;
        this.nome = nome;
        this.telefone = telefone;
        this.conta = conta;
    }

    public List<Conta> getConta() {
        return conta;
    }

    public void setConta(List<Conta> conta) {
        this.conta = conta;
    }


    public int getNuCpf() {
        return nuCpf;
    }

    public void setNuCpf(int nuCpf) {
        this.nuCpf = nuCpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }


}
