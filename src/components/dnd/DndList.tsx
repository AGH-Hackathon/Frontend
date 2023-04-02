import { useCallback, useState } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndItem } from "./DndItem";
// @ts-ignore
import update from 'immutability-helper'
import { Box, styled } from "@mui/material";


export interface Item {
  id: number,
  image: string,
  text: string
}

const StyledList = styled(Box)(({ theme }) => ({
  gap: theme.spacing(3),
}))

export const DndList = (props) => {

  const { items, setItems } = props

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevCards: Item[]) => {
      const newCards = [...prevCards];
      const draggedItem = newCards[dragIndex];
      newCards[dragIndex] = newCards[hoverIndex];
      newCards[hoverIndex] = draggedItem;
      return newCards;
    });
  }, []);
  
  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <DndItem
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
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