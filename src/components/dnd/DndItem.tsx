import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Box, styled } from "@mui/material";

const StyledCard = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  width: "100%",
  height: theme.spacing(10),
  margin: theme.spacing(4, 0),
  padding: theme.spacing(0, 2),
  background: theme.palette.primary.main,
  color: 'white',
  fontFamily: 'Inter',
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
}))

export interface CardProps {
  id: any
  text: string
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const ItemTypes = {
  CARD: 'card',
}

export const DndItem: FC<CardProps> = ({ id, text, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <StyledCard ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {text}
    </StyledCard>
  )
}
