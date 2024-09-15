package com.horibank.horibank.domain;

import com.horibank.horibank.domain.enums.TipoConta;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "conta")
public class Conta {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer idPessoa;
    private int numero;
    private int digito;
    private double saldo;
    
    @Enumerated(EnumType.STRING)
    private TipoConta tipoConta;
   
    public Conta() {
    }
    
    public Conta(Integer idPessoa, int numero, int digito, double saldo, TipoConta tipoConta) {
        this.idPessoa = idPessoa;
        this.numero = numero;
        this.digito = digito;
        this.saldo = saldo;
        this.tipoConta = tipoConta;
    }

    public Integer getId() {
        return id;
    }

    public Integer getIdPessoa() {
        return idPessoa;
    }

    public int getNumero() {
        return numero;
    }


    public void setNumero(int numero) {
        this.numero = numero;
    }


    public int getDigito() {
        return digito;
    }


    public void setDigito(int digito) {
        this.digito = digito;
    }


    public double getSaldo() {
        return saldo;
    }


    public void setSaldo(double saldo) {
        this.saldo = saldo;
    }


    public TipoConta getTipoConta() {
        return tipoConta;
    }


    public void setTipoConta(TipoConta tipoConta) {
        this.tipoConta = tipoConta;
    }

    @Override
    public String toString() {
        return "Conta [idPessoa=" + idPessoa + ", numero=" + numero + ", digito=" + digito + ", saldo=" + saldo
                + ", tipoConta=" + tipoConta + "]";
    }
    

    public void Depositar(double valor) {
        this.saldo += valor;
    }
}
