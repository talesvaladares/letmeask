import copyImg from '../../assets/images/copy.svg';
import "./styles.scss";

type RoomCodeProps = {
  code: string;
}

export function RoomCode({code}: RoomCodeProps){

    function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="copiar código da sala"/>
      </div>
      <span>Sala #{code} </span>
    </button>
  );
};