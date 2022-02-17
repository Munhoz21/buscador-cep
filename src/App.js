import {FiSearch} from 'react-icons/fi'
import './styles.css';
import {useState} from 'react'
import api from './services/api';

function App() {
const [input, setInput]= useState('');
const [cep, setCep]= useState({})

async function handleSearch(){
  if(input === ''){
    alert('Preencha com algum CEP!')
    return;
  }

  try{

    const response= await api.get(`${input}/json`)
    console.log(response.data)
    setCep(response.data)
    setInput('');


  }catch{
    alert('OPS! Ocorreu um erro')
    setInput('');
  }
}

  return (
    <div className="container">
     <h1 className="title">BUSCADOR CEP</h1>

    <div className="containerInput">
      <input type='text' placeholder="Coloque seu CEP" value={input} onChange={(e) => setInput(e.target.value)}  ></input>
        <button className="buttonSearch"  onClick={handleSearch} onKeyPress>
          <FiSearch size={25} color='#000'/>
        </button>
    </div>
    {Object.keys(cep).length > 0 && (
       <main className='main'>
       <h2>CEP:{cep.cep}</h2>
 
       <span>{cep.logradouro}</span>
       <span> {cep.complemento}</span>
       <span>{cep.bairro}</span>
       <span>{cep.localidade}</span>
     </main>
    )}
    
    </div>
  );
}

export default App;
