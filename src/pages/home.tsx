import { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom'
import {useAuth} from '../contexts/authContext';

import { database} from '../services/firebase';

import {Button} from '../components/Button';

import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleImg from '../assets/images/google-icon.svg'
import "../styles/auth/styles.scss";

export function Home(){
  
  const {push} = useHistory();
  const {signInWithGoogle, user} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){

    if(!user){
     await signInWithGoogle();
    }

    push('/rooms/new');

  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exist');
      return;
    }

    if(roomRef.val().endedAt){
      alert("Room already closed.");
      return;
    }

    push(`/room/${roomCode}`);
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
          <button className="createRoom" onClick={handleCreateRoom}>
            <img src={GoogleImg} alt="google"/>
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input  
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit" >Entrar na sala</Button>
          </form>
        </div>
      
      </main>

    </div>
  );
};