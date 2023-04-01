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
    backgroudn: theme.palette.primary.main,
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

export const MatchingGameView = memo((props) => {

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
        console.log(SERVER_URL)
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
        console.log(json)
    }, [labels])

    return (
        <StyledContainer>
            <StyledTimer time={20} />
            <StyledList>
                <StyledImages>
                    {images.map(({ id, url }) => <StyledImage key={id} src={url} alt={id.toString()} />)}
                </StyledImages>
                <StyledLabels>
                    <DndList items={labels} setItems={setLabels} />
                </StyledLabels>
            </StyledList>
            <Timer time={20} />
            <Button onClick={submitAnswers} sx={{ width: 64, marginLeft: 'auto' }}>SUBMIT</Button>
        </StyledContainer>
    )
})