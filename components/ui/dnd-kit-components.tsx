"use client"

import React from "react"

import { createContext, useContext } from "react"
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type UniqueIdentifier,
  type DragEndEvent,
  DragOverlay,
  type Active,
  MeasuringStrategy,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import { GripVertical } from "lucide-react"
import { Card } from "./card"
import { createPortal } from "react-dom"

// DND Context Provider
interface DndProviderProps {
  children: React.ReactNode
  onDragEnd: (event: DragEndEvent) => void
  onDragStart: (event: Active) => void
  items: UniqueIdentifier[]
  collisionDetection?: typeof closestCenter
}

export function DndProvider({
  children,
  onDragEnd,
  onDragStart,
  items,
  collisionDetection = closestCenter,
}: DndProviderProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

// Draggable Item (for preset fields)
interface DraggableItemProps {
  id: UniqueIdentifier
  children: React.ReactNode
  className?: string
  data?: Record<string, any> // Optional data to pass during drag
}

export function DraggableItem({ id, children, className, data }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { ...data, type: "presetField" },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  // Ensure children is a single React element and clone it to inject props
  const draggableChild = React.Children.only(children) as React.ReactElement

  return React.cloneElement(draggableChild, {
    ref: setNodeRef,
    style: { ...draggableChild.props.style, ...style }, // Merge styles
    className: cn(draggableChild.props.className, className, isDragging && "opacity-50", "cursor-grab"), // Add cursor-grab and merge classes
    ...attributes,
    ...listeners,
  })
}

// Drag Handle (for use inside SortableItem's children)
interface DragHandleProps {
  className?: string
}

export function DragHandle({ className }: DragHandleProps) {
  const { listeners } = useSortable({ id: useDndItemContext().id })
  return (
    <div {...listeners} className={cn("cursor-grab", className)}>
      <GripVertical className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

// Droppable Area (for sections or field containers)
interface DroppableAreaProps {
  id: UniqueIdentifier
  children: React.ReactNode
  className?: string
}

export function DroppableArea({ id, children, className }: DroppableAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: "droppableArea", containerId: id }, // Explicitly set data for this droppable area
  })

  return (
    <div
      ref={setNodeRef}
      id={String(id)}
      className={cn(
        "min-h-[100px] rounded-md border border-dashed border-neutral-300 p-4",
        className,
        isOver && "border-primary-500 bg-primary-50", // Visual feedback when hovered
      )}
    >
      {children}
    </div>
  )
}

// Context for DND item ID
const DndItemContext = createContext<{ id: UniqueIdentifier }>({ id: "" })
export const useDndItemContext = () => useContext(DndItemContext)

// Sortable Item Componentt (for fields on the canvas and sections)
interface SortableItemProps {
  id: UniqueIdentifier
  children: React.ReactNode
  className?: string
  draggingClassName?: string
  data?: Record<string, any> // Allow passing data for sections
}

export function SortableItem({ id, children, className, draggingClassName, data }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, data })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <DndItemContext.Provider value={{ id }}>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "p-2 rounded-md bg-background shadow-sm border border-border flex items-center justify-between gap-4",
          className,
          isDragging && draggingClassName,
        )}
      >
        <div className="flex-1">{children}</div>
        <div {...attributes} {...listeners} className="cursor-grab p-1 -mr-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </DndItemContext.Provider>
  )
}

interface DragOverlayWrapperProps {
  children: React.ReactNode
  active: Active | null
}

export function DragOverlayWrapper({ children, active }: DragOverlayWrapperProps) {
  return createPortal(
    <DragOverlay>
      {active ? <Card className="p-4 bg-white shadow-lg border border-primary-200 w-[200px]">{children}</Card> : null}
    </DragOverlay>,
    document.body,
  )
}
