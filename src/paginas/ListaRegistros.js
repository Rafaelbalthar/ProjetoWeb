import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotaoVoltar from '../componentes/BotaoVoltar';
import { Link } from 'react-router-dom';

import '../App.css';
import axiosInstance from '../axios/configuracaoAxios';

//Importar o modal
import Modal from '../componentes/Modal';


 // Importando o ícone de edicao
import { FaEdit,FaTrash  } from 'react-icons/fa'; 


function ListaRegistros() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/pecas')
      .then(response => {
        setRegistros(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Houve um problema ao buscar os registros.');
        setLoading(false);
      });
  }, []);


  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };


  const confirmDelete = () => {
    axios.delete(`http://localhost:3001/api/pecas/${selectedId}`)
      .then(response => {
        setRegistros(registros.filter(registro => registro.id !== selectedId));
        setMensagem('Registro deletado com sucesso!');
        setShowModal(false);
      })
      .catch(error => {
        setError('Houve um problema ao deletar o registro.');
        setShowModal(false);
      });

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
      }, 3000);

  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedId(null);
  };


  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="lista-registros">
      <h2>Lista de Peças</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Material</th>
            <th>Fornecedor</th>
            <th>Desenho</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(registro => (
            <tr key={registro.id}>
              <td>{registro.codigo}</td>
              <td>{registro.nome}</td>
              <td>{registro.material}</td>
              <td>{registro.fornecedor}</td>
              <td>{registro.desenho}</td>
              <td class="action-column">
                <Link to={`/editar/${registro.id}`} className="espaco_coluna">
                   <FaEdit/> Editar  {/* Ícone de edição */}
                </Link>
                
                <Link onClick={() => handleDelete(registro.id)} >
                  <FaTrash /> Deletar {/* Ícone de delete */}
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <BotaoVoltar/>
      <Modal
        show={showModal}
        handleClose={closeModal}
        handleConfirm={confirmDelete}
        title="Confirmar Exclusão"
      >
        Tem certeza que deseja deletar a peça?
      </Modal>
      </div>
  );
}
export default ListaRegistros;