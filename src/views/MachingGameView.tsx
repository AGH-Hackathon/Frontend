import {Card, styled} from "@mui/material";
import {memo} from "react";
import {DndList} from "../components/dnd/DndList";


const StyledCard = styled(Card)({
    display: "flex",
    flexDirection: "column",
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    "& > *": {
        margin: "10px 0"
    }
})

const descriptions =
    [
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
    ]


export const MatchingGameView = memo((props) => {

    return (
        <StyledCard>
                <DndList items={descriptions}/>
        </StyledCard>
    )
})