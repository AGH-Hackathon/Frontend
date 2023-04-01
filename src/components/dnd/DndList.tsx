import {useCallback, useState} from "react";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndItem} from "./DndItem";
// @ts-ignore
import update from 'immutability-helper'


export interface Item {
    id: number
    text: string
}

export const DndList = (props) => {
  const [items, setItems] = useState(props.items)

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
    )
  }, [])

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
            <div>{items.map((card, i) => renderCard(card, i))}</div>
        </DndProvider>
  )
}