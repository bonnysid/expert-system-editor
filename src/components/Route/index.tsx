import React, { FC } from 'react';
import { Line, Text } from 'react-konva';
import Konva from 'konva';

interface IProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    value: number;
    onDoubleClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}

const Route: FC<IProps> = ({ value, endY, endX, startY, startX, onDoubleClick}) => {
    return (
        <>
            <Line
                onDblClick={onDoubleClick}
                points={[startX, startY, endX, endY]}
                value={value}
                stroke="#333333" />
            <Text
                onDblClick={onDoubleClick}
                x={5 + (startX + endX) / 2}
                y={(startY + endY) / 2}
                fontSize={16}
                fontFamily="Rubik"
                text={value.toString()}
            />
        </>
    );
};

export default Route;
