import React, { FC } from 'react';
import { Line, Text } from 'react-konva';
import Konva from 'konva';
import { COLORS } from '../../constants/utils';

interface IProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isNew?: boolean;
}

export const Route: FC<IProps> = ({ endY, endX, startY, startX, isNew}) => {
    return (
        <>
            <Line
                points={[startX, startY, endX, endY]}
                stroke={isNew ? COLORS.lightGray : COLORS.black}
            />
        </>
    );
}
