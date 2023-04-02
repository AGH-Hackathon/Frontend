import { Box, styled } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { Button } from "../components/Button";
import { DndList } from "../components/dnd/DndList";
import { SERVER_URL } from "../const";
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

const images = [
    { id: 1, url: '/kobietka.jpeg' },
    { id: 2, url: '/kobietka.jpeg' },
    { id: 3, url: '/kobietka.jpeg' },
    { id: 4, url: '/kobietka.jpeg' },
]

type MatchingGameViewProps = {
    isGameStarted: boolean
}

export const MatchingGameView = memo(({ isGameStarted }: MatchingGameViewProps) => {

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
            body: JSON.stringify({ message: 'siema' })
        })
        const json = await res.json()
    }, [labels])

    return (
        <StyledContainer>
            <StyledList>
                <StyledImages>
                    {images.map(({ id, url }) => <StyledImage key={id} src={url} alt={id.toString()} />)}
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