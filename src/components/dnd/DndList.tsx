import { useCallback, useState } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndItem } from "./DndItem";
// @ts-ignore
import update from 'immutability-helper'
import { Box, styled } from "@mui/material";
import { Description } from "../../views/SocketProvider";


export interface Item {
  id: number,
  image: string,
  text: string
}

const StyledList = styled(Box)(({ theme }) => ({
  gap: theme.spacing(3),
}))

type DndListProps = {
  items: Description[]
  setItems: React.Dispatch<React.SetStateAction<Description[]>>
}

export const DndList = ({items, setItems}: DndListProps) => {

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevCards) => {
      const newCards = [...prevCards];
      const draggedItem = newCards[dragIndex];
      newCards[dragIndex] = newCards[hoverIndex];
      newCards[hoverIndex] = draggedItem;
      return newCards;
    });
  }, []);
  
  const renderCard = useCallback(
    (card: Description, index: number) => {
      return (
        <DndItem
          key={card.uuid}
          index={index}
          id={card.uuid}
          text={card.content}
          moveCard={moveCard}
        />
      )
    },
    [],
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <StyledList display='flex' flexDirection='column'>
        {items.map((card, i) => renderCard(card, i))}
      </StyledList>
    </DndProvider>
  )
}