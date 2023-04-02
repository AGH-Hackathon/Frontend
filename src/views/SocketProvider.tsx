import { useParams } from 'react-router-dom';
import { useCallback, useState } from 'react'
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
  path: string
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
  scoreboard: any
}

export const SocketProvider = () => {
  const { room_id } = useParams()

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [roundId, setRoundId] = useState('')
  const [descriptions, setDescription] = useState([])
  const [images, setImages] = useState([])
  const [scoreboard, setScoreboard] = useState<any>()

  const onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = useCallback((msg: GameMessage) => {
    switch (msg.action) {
      case GameAction.GameStart:
        if (!isGameStarted) {
          setIsGameStarted(true)
        }
        break;
      case GameAction.GameEnd:
        console.log(isGameStarted, msg)
          setIsGameEnded(true)
          setScoreboard(msg.scoreboard)
        break;
      case GameAction.RoundStart:
        setDescription(msg.descriptions)
        setRoundId(msg.roundId)
        setImages(msg.images)
        break;
      case GameAction.RoundEnd:
        break;
    }
    // setMessage(msg);
  }, [])

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
        <MatchingGameView
          isGameStarted={isGameStarted}
          isGameEnded={isGameEnded}
          images={images}
          descriptions={descriptions}
          roundId={roundId}
          scoreboard={scoreboard}
        />
    </>
  )
}