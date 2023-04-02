import { Box, styled } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { Button } from "../components/Button";
import { DndList } from "../components/dnd/DndList";
import { SERVER_URL, SOCKET_URL } from "../const";
import { useParams } from 'react-router-dom';
import SockJsClient from 'react-stomp';
import useSockjs from 'react-use-sockjs';
import { Timer } from "../components/Timer";

const StyledLabels = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: "800px",
    width: '100%',
    padding: theme.spacing(3),
}))

const StyledImages = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: '100%',
    maxWidth: theme.spacing(8),
    gap: theme.spacing(3),
    padding: theme.spacing(3),
}))

const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(8),
    height: theme.spacing(8),
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
}))

const StyledList = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
})
const StyledContainer = styled(Box)({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-end', // align items to the right
})

const StyledTimer = styled(Timer)({
    position: 'absolute',
    top: 0,
    right: 0,
})

const images = [
    { id: 1, url: '/kobietka.jpeg' },
    { id: 2, url: '/kobietka.jpeg' },
    { id: 3, url: '/kobietka.jpeg' },
    { id: 4, url: '/kobietka.jpeg' },
]

enum GameAction {
    GameStart = 'gameStart',
    GameEnd = 'gameEnd',
    RoundStart = 'roundStart',
    RoundEnd = 'roundEnd',
}

type GameMessage = {
    action: GameAction;
    roundId: string;
    descriptions: any;
    images: any;
}

export const MatchingGameView = memo((props) => {

    const { room_id } = useParams()
    console.log(`/game/${room_id}`)

    // const { sendMessage } = useSockjs({
    //     url: SOCKET_URL,
    //     topics: [`/game/${room_id}`],
    //     // onMessage: (body, destination) => {
    //     //     console.log(body, destination);
    //     // },
    // });

    // const [message, setMessage] = useState('You server message here.');
    const [isGameStarted, setIsGameStarted] = useState(true)

    const onConnected = () => {
        console.log("Connected!!")
    }

    const onMessageReceived = (msg: GameMessage) => {
        console.log(msg)
        switch (msg.action) {
            case GameAction.GameStart:
                setIsGameStarted(true)
        }
        // setMessage(msg);
    }

    const [labels, setLabels] = useState([
        {
            id: 1,
            text: 'Text1',
        },
        {
            id: 2,
            text: 'Text2',
        },
        {
            id: 3,
            text: 'Text3',
        },
        {
            id: 4,
            text: 'Text4',
        },
    ])

    const submitAnswers = useCallback(async () => {
        const answers = images.map((image, index) => ({
            imageId: image.id,
            labelId: labels[index].id
        }))
        const res = await fetch(`${SERVER_URL}`, {
            method: 'POST',
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ message: 'siema' })
        })
        const json = await res.json()
    }, [labels])

    return (
        <>
            {!isGameStarted ? (
                <p>Loading...</p>
            ) : (
                <StyledContainer>
                    <SockJsClient
                        url={SOCKET_URL}
                        topics={[`/game/${room_id}`]}
                        onConnect={onConnected}
                        onDisconnect={console.log("Disconnected!")}
                        onMessage={(msg: any) => onMessageReceived(msg)}
                        debug={false}
                    />
                    <StyledList>
                        <StyledTimer time={20} />
                        <StyledImages>
                            {images.map(({ id, url }) => <StyledImage key={id} src={url} alt={id.toString()} />)}
                        </StyledImages>
                        <StyledLabels>
                            <DndList items={labels} setItems={setLabels} />
                        </StyledLabels>
                    </StyledList>
                    <Button onClick={submitAnswers} sx={{ width: 64, marginLeft: 'auto' }}>SUBMIT</Button>
                </StyledContainer>
            )}
        </>
    )
})