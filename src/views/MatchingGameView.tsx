import { Box, styled } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { Button } from "../components/Button";
import { DndList } from "../components/dnd/DndList";
import { SERVER_URL } from "../const";
import { Timer } from "../components/Timer";
import { Description, Image } from "./SocketProvider";

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
    images: Image[],
    descriptions: Description[]
}

export const MatchingGameView = memo(({ images, descriptions }: MatchingGameViewProps) => {

    const [labels, setLabels] = useState(descriptions)

    const submitAnswers = useCallback(async () => {
        const answers = images.map((image, index) => ({
            imageId: image.uuid,
            labelId: labels[index].uuid
        }))
        const res = await fetch(`${SERVER_URL}`, {
            method: 'POST',
            body: JSON.stringify({ answers })
        })
        const json = await res.json()
    }, [labels])

    return (
        <StyledContainer>
            <StyledList>
                <StyledImages>
                    {images.map(({ uuid, url }) => <StyledImage key={uuid} src={url} alt={uuid.toString()} />)}
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