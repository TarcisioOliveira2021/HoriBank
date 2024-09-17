package com.horibank.horibank.domain;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transferencia")
public class Transferencia {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer idContaOrigem;
    private Integer idContaDestino;
    private double valor;
    private LocalDateTime data;
    
    public Transferencia() {
    }

    public Transferencia(Integer idContaOrigem, Integer idContaDestino, double valor, LocalDateTime data) {
        this.idContaOrigem = idContaOrigem;
        this.idContaDestino = idContaDestino;
        this.valor = valor;
        this.data = data;
    }

    public Integer getIdContaOrigem() {
        return idContaOrigem;
    }

    public Integer getId() {
        return id;
    }

    public Integer getIdContaDestino() {
        return idContaDestino;
    }

    public double getValor() {
        return valor;
    }

    public LocalDateTime getData() {
        return data;
    }
}
