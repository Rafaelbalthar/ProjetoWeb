import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../Header';
import BotaoVoltar from '../componentes/BotaoVoltar';
import axiosInstance from '../axios/configuracaoAxios';

function EditarRegistro() {

  const { id } = useParams();
  const navigate = useNavigate();

  //cria novo estado para os campos da tela
  const [campos, setCampos] = useState({
    codigo: '',
    nome: '',
    material: '',
    fornecedor: '',
    desenho: '',
    email: '',
  });




  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  const [erros, setErros] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/api/buscarId/${id}`)
      .then(response => {
        setCampos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setMensagem('Houve um problema ao buscar o registro.');
        setLoading(false);
      });
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCampos(prevCampos => ({
      ...prevCampos,
      [name]: value
    }));
  }
  function validarCampos() {
    const novosErros = {};

    if (!campos.codigo) {
      novosErros.codigo = 'Código é obrigatório';
    }

    if (!campos.nome) {
      novosErros.nome = 'Digite o nome da peça';
    }

    if (!campos.material) {
      novosErros.material = 'Material é obrigatório';
    }

    if (!campos.fornecedor) {
      novosErros.fornecedor = 'Fornecedor é obrigatório';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    axiosInstance.put(`/pecas/${id}`, campos)
      .then(response => {
        setMensagem('Dados editados com sucesso!');

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
          navigate(-1);
        }, 3000);


      })
      .catch(error => {
        setMensagem('Houve um problema ao atualizar o registro.');
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <Header title="Editar Peça" />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
  );
}


export default EditarRegistro;