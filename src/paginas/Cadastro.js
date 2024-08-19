import Header from '../Header';

import '../App.css';

import BotaoVoltar from '../componentes/BotaoVoltar';

//Utilizada para auxiliar no controle de outras funcoes da aplicacao
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import axiosInstance from '../axios/configuracaoAxios';

function Cadastro() {

    //cria novo estado para os campos da tela
    const [campos, setCampos] = useState({
        nome: '',
        codigo: '',
        fornecedor: '',
        material: '',
        desenho: '',
        email: '',
        senha: '',
        confimarsenha: ''
    });

    const [mensagem, setMensagem] = useState('');

    const [erros, setErros] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCampos(prevCampos => ({
            ...prevCampos,
            [name]: value
        }));

        setErros(prevErros => ({
            ...prevErros,
            [name]: ''
        }));
    }

    function validarCampos() {
        const novosErros = {};

        if (!campos.nome) {
            novosErros.nome = 'Digite o nome da peça';
        }

        if (!campos.codigo) {
            novosErros.codigo = 'Código é obrigatório';
        }

        if (!campos.fornecedor) {
            novosErros.fornecedor = 'Fornecedor é obrigatório';
        }

        if (!campos.material) {
            novosErros.material = 'Material é obrigatório';
        }

        if (!campos.desenho) {
            novosErros.desenho = 'Desenho é obrigatório';
        }

        if (!campos.email) {
            novosErros.email = 'E-mail é obrigatório';
        }

        if (!campos.senha) {
            novosErros.senha = 'Senha é obrigatório';
        }

        if (!campos.confirmarsenha) {
            novosErros.confirmarsenha = 'Confirmar Senha é obrigatório';
        } else if (campos.confirmarsenha !== campos.senha) {
            novosErros.senha = 'Senha e Confirmar Senha devem ser iguais!';
        }
        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function validaConfirmacaoSenha() {
        const novosErros = {};
        if (!campos.confirmarsenha) {
            novosErros.confirmarsenha = 'Confirmar Senha é obrigatório';
        } else if (campos.confirmarsenha !== campos.senha) {
            novosErros.confirmarsenha = 'Senha e Confirmar Senha devem ser iguais!';
        }
        setErros(novosErros);
    }

    function handleFormSubmit(event) {

        event.preventDefault();

        if (!validarCampos()) {
            return;
        }

        console.log('Submetendo:', campos);

        axiosInstance.post('/pecas', campos)
            .then(response => {
                setMensagem('Formulário enviado com sucesso!');
                console.log(response.data);

                // Limpar os campos do formulário após o envio
                setCampos({
                    nome: '',
                    codigo: '',
                    fornecedor: '',
                    material: '',
                    desenho: '',
                    email: '',
                    senha: '',
                    confimarsenha: ''
                });

                // Limpar mensagem após 3 segundos
                setTimeout(() => {
                    setMensagem('');
                }, 3000);
            })
            .catch(error => {
                console.error('Houve um erro ao enviar o formulário:', error);
                setMensagem('Erro ao enviar o formulário. Tente novamente.');
            });
    }
    return (
        <div className="App">
            <Header title="Cadastro de Peças" />

            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Dados da peça</h2>
                        </legend>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Nome:
                                    <input type="text" name="nome" id="nome" value={campos.nome} onChange={handleInputChange} />
                                    {erros.nome && <p className="error">{erros.nome}</p>}
                                </label>
                            </div>
                        </div>
                        
                        <div className="field-menor">
                            <label>Código:
                                <input type="text" name="codigo" id="codigo" value={campos.codigo} onChange={handleInputChange} />
                                {erros.codigo && <p className="error">{erros.codigo}</p>}
                            </label>
                        </div>

                        <div className="inline-fields">
                            <div className="field-menor">
                                <label>Material:
                                    <input type="text" name="material" id="material" value={campos.material} onChange={handleInputChange} />
                                    {erros.material && <p className="error">{erros.material}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Fornecedor:
                                    <input type="text" name="fornecedor" id="fornecedor" value={campos.fornecedor} onChange={handleInputChange} />
                                    {erros.fornecedor && <p className="error">{erros.fornecedor}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Desenho:
                                    <input type="text" name="desenho" id="desenho" value={campos.desenho} onChange={handleInputChange} />
                                    {erros.bairro && <p className="error">{erros.desenho}</p>}
                                </label>
                            </div>
                        </div>

                        <input type="submit" value="Salvar" />
                    </fieldset>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <BotaoVoltar></BotaoVoltar>
            </div>
        </div>
    )
}

export default Cadastro;