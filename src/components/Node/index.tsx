import React, { FC, useMemo, useRef, useState } from 'react';
import { Circle, Text, Image, Rect, Group } from 'react-konva';
import { COLORS } from '../../constants/utils';
import Konva from 'konva';
import { INode } from '../../types';

interface IProps {
    node: INode;
    onClick?: () => void;
    isSelected?: boolean;
    onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void;
    onDragMove?: (e: Konva.KonvaEventObject<DragEvent>) => void;
    onDoubleClick: () => void;
    draggable?: boolean;
    number: number;
    isOnlyText?: boolean;
}

const RADIUS = 15;
const TEXT_FZ = 14;
const PADDING = 15;

export const Node: FC<IProps> = ({ node, onClick, isSelected, onDragEnd, onDragMove, number, draggable, onDoubleClick, isOnlyText }) => {
    const fillColor = useMemo(() => {
        if (node.isNew) {
            return COLORS.lightGray;
        }

        return isSelected ? COLORS.red : COLORS.black;
    }, [node.isNew, isSelected]);
    const [textWidth, setTextWidth] = useState(100);
    const [textHeight, setTextHeight] = useState(100);

    if (node.isNew || !isOnlyText) {
        return (
            <>
                <Circle
                    draggable={draggable}
                    x={node.x}
                    y={node.y}
                    onClick={onClick}
                    radius={RADIUS}
                    fill={fillColor}
                    strokeWidth={isSelected ? 2 : 0}
                    onDragMove={onDragMove}
                    onDragEnd={onDragEnd}
                    onDblClick={onDoubleClick}
                />
                { number &&
                <Text
                    text={node.isNew ? '+' : String(number)}
                    x={node.x - RADIUS / 2 + 3}
                    y={node.y - RADIUS / 2}
                    fontSize={TEXT_FZ}
                    fontStyle={'normal'}
                    fontFamily="Rubik"
                    stroke={COLORS.white}
                    onClick={onClick}
                    onDblClick={onDoubleClick}
                    onDragMove={onDragMove}
                    onDragEnd={onDragEnd}
                    draggable
                />
                }
            </>
        );
    }

    return (
        <Group>
            <Rect
                x={node.x - textWidth / 2}
                y={node.y - textHeight / 2}
                width={textWidth + PADDING}
                height={textHeight + PADDING}
                fill={COLORS.black}
                cornerRadius={10}
                onClick={onClick}
                onDblClick={onDoubleClick}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                draggable
            />
            <Text
                text={node.text}
                x={node.x - textWidth / 2 + PADDING / 2}
                y={node.y - textHeight / 2 + PADDING / 2}
                fontSize={20}
                fontStyle={'normal'}
                fontFamily="Rubik"
                stroke={COLORS.white}
                onClick={onClick}
                onDblClick={onDoubleClick}
                onDragMove={onDragMove}
                onDragEnd={onDragEnd}
                draggable
                ref={ref => {
                    setTextHeight(ref?.height() || 30)
                    setTextWidth(ref?.width() || 100)
                }}
            />
        </Group>

    );
};
