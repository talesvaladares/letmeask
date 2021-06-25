import { FormEvent, useState } from 'react';
import {Link, useHistory} from 'react-router-dom'

import {database} from '../services/firebase';
import {useAuth} from '../contexts/authContext';

import {Button} from '../components/Button';


import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import "../styles/auth/styles.scss";

export function NewRoom(){

  const [newRoom, setNewRoom] = useState('');
  const {push} = useHistory();
  const {user} = useAuth();

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
    }

    //falo que dentro do meu banco de dados existe uma categoria rooms
    const roomRef = database.ref('rooms');

    //empurra os dados da sala no firebase
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
      
    });

    push(`/room/${firebaseRoom.key}`);   

  }
 
  return(
    <div id="pageAuth">
      
      <aside>
        <img src={IllustrationImg} alt="ilustration"/>
        <strong>Cria salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência tem tempo real</p>
      </aside>
      
      <main>
        
        <div className="mainContent">
          <img src={LogoImg} alt="logo"/>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input  
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit" >Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? 
            <Link to="/"> 
              clique aqui 
            </Link> 
          </p>
        </div>
      
      </main>

    </div>
  );
};