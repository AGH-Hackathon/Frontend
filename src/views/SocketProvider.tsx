import { useParams } from 'react-router-dom';
import { useState } from 'react'
import SockJsClient from 'react-stomp';
import { SOCKET_URL } from "../const";
import { MatchingGameView } from './MatchingGameView';
import { Loading } from './Loading';
import { JoinRoomView } from './JoinRoomView';

enum GameAction {
  GameStart = 'gameStart',
  GameEnd = 'gameEnd',
  RoundStart = 'roundStart',
  RoundEnd = 'roundEnd',
}

export type Image = {
  uuid: string;
  url: string
}

export type Description = {
  uuid: string;
  content: string
}

type GameMessage = {
  action: GameAction;
  roundId: string;
  descriptions: Image[];
  images: Description[];
}

export const SocketProvider = () => {
  const { room_id } = useParams()

  const [isGameStarted, setIsGameStarted] = useState(true)
  const [username, setUsername] = useState()
  const [descriptions, setIsDescription] = useState([])
  const [images, setImages] = useState([])

  const onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = (msg: GameMessage) => {
    console.log(msg)
    switch (msg.action) {
      case GameAction.GameStart:
        if (!isGameStarted) {
          setIsGameStarted(true)
        }
        break;
      case GameAction.GameEnd:
        if (isGameStarted) {
          // setIsGameStarted(false)
        }
        break;
      case GameAction.RoundStart:
        setIsDescription(msg.descriptions)
        setImages(msg.images)
        break;
      case GameAction.RoundEnd:
        break;
    }
    // setMessage(msg);
  }

  return (
    <>
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/game/${room_id}`]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg: any) => onMessageReceived(msg)}
        debug={false}
      />
      {isGameStarted ? (
        <MatchingGameView
          images={images}
          descriptions={descriptions}
        />
      ) : !username ? (
        <JoinRoomView roomId={room_id} setUsername={setUsername} />
      ) : (
        <Loading label={"Loading..."} />
      )}
    </>
  )
}