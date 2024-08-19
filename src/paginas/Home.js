import logo from '../logo.svg';
import '../App.css';

import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <Header tittle="Parametro de título"/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a>
        <p>Praticas Avançadas em Desenvolvimento Web </p>
        </a>
        <Link to="/cadastro">Cadastrar Peças</Link>
        <Link to="/lista">Listagem de Peças</Link>
      </header>
      <Footer/>
    </div>
  );
}

export default Home;
