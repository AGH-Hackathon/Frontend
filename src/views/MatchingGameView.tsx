import { Box, styled } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { DndList } from "../components/dnd/DndList";
import { SERVER_URL } from "../const";
import { Timer } from "../components/Timer";
import { Description, Image } from "./SocketProvider";
import { Loading } from "./Loading";
import { JoinRoomView } from "./JoinRoomView";
import { useParams } from 'react-router-dom'
import { ScoresView } from "./ScoresView";

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
    maxWidth: theme.spacing(16),
    gap: theme.spacing(3),
    padding: theme.spacing(3),
}))

const StyledImage = styled('img')(({ theme }) => ({
    width: theme.spacing(16),
    height: theme.spacing(16),
    padding: theme.spacing(1),
    background: theme.palette.primary.main,
}))

const StyledList = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
})

const StyledContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: theme.spacing(120),
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-end', // align items to the right
}))

const StyledTimer = styled(Timer)({
    position: 'absolute',
    top: 0,
    right: 0,
})

type MatchingGameViewProps = {
    isGameStarted: boolean,
    isGameEnded: boolean;
    images: Image[],
    descriptions: Description[]
    roundId: string
    scoreboard: any
}

export const MatchingGameView = memo(({ isGameStarted, images, descriptions, roundId, isGameEnded, scoreboard }: MatchingGameViewProps) => {

    const [labels, setLabels] = useState(descriptions)
    const [userId, setUserId] = useState('')

    const {room_id} = useParams()

    const submitAnswers = useCallback(async () => {
        const answers = images.map((image, index) => ({
            ImageId: image.uuid,
            descriptionId: labels[index].uuid
        }))
        const res = await fetch(`http://localhost:8008/game/${room_id}/${roundId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        })
        const json = await res.json()
        console.log(json)
    }, [labels])

    useEffect(() => {
        setLabels(descriptions)
    }, [descriptions])

    if (!userId) {
        return (
            <JoinRoomView roomId={room_id} setUsername={setUserId}/>
        )
    }

    if (!isGameStarted) {
        return <Loading label='Waiting for host'/>
    }

    if (isGameEnded) {
        return <ScoresView score={scoreboard}/>
    }

    return (
        <StyledContainer>
            <StyledList>
                <StyledImages>
                    {images.map(({ uuid, path }) => <StyledImage key={uuid} src={path} alt={uuid.toString()} />)}
                </StyledImages>
                <StyledLabels>
                    <DndList items={labels} setItems={setLabels} />
                </StyledLabels>
                <StyledImages>
                    <StyledTimer time={20} />
                </StyledImages>
            </StyledList>
            <Button onClick={submitAnswers} sx={{ width: 64, marginLeft: 'auto' }}>SUBMIT</Button>
        </StyledContainer>
    )
})