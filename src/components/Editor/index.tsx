import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { useNode } from '../../providers';
import { INode } from '../../types';
import { NodeEditModal } from '../NodeEditModal';
import { Route } from '../Route';
import { Node } from '../Node';
import { v4 } from 'uuid';
import Konva from 'konva';
import KonvaEventObject = Konva.KonvaEventObject;
import Vector2d = Konva.Vector2d;
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Editor: FC = () => {
    const {nodes, createNode, findNode, isOnlyText, onMove} = useNode();
    const [selectedNode, setSelectedNode] = useState<INode>();
    const [isShowNodeEdit, setIsShowNodeEdit] = useState(false);
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [offset, setOffset] = useState<Vector2d>({x: 0, y: 0});
    const [scale, setScale] = useState<Vector2d>({x: 1, y: 1});
    const mouseDownCoords = useRef({x: 0, y: 0});
    const mouseUpCoords = useRef({x: 0, y: 0});
    const isMouseDown = useRef(false);

    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        onResize();

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const renderedRoutes = useMemo(() => {
        let res: JSX.Element[] = [];
        nodes.forEach(({x, y, onPositiveId, onNegativeId}) => {
            const positiveNode = findNode(onPositiveId || '');
            const negativeNode = findNode(onNegativeId || '');

            if (positiveNode) {
                res.push(
                    <Route
                        key={positiveNode.id + v4()}
                        startX={x}
                        endX={positiveNode.x}
                        startY={y}
                        endY={positiveNode.y}
                        isNew={positiveNode.isNew}
                    />
                )
            }

            if (negativeNode) {
                res.push(
                    <Route
                        key={negativeNode.id + v4()}
                        startX={x}
                        endX={negativeNode.x}
                        startY={y}
                        endY={negativeNode.y}
                        isNew={negativeNode.isNew}
                    />
                )
            }
        }, []);
        return res;
    }, [nodes, findNode]);

    const onDoubleClickNode = (node: INode) => {
        if (!node.isNew) {
            setIsShowNodeEdit(true);
            setSelectedNode(node);
        }
    };

    const onClickNode = (node: INode) => {
        if (node.isNew) {
            createNode(node.id);
        }
    };

    const handleDragEnd = useCallback((e: KonvaEventObject<DragEvent>, node: INode) => {
        onMove(node, e.target.x(), e.target.y());
    }, [onMove])

    const handleDragMove = useCallback((e: KonvaEventObject<DragEvent>, node: INode) => {
        onMove(node, e.target.x(), e.target.y());
    }, [onMove])

    const renderedNodes = useMemo(() => {
        return nodes.map((node, i) => {
            return (
                <Node
                    onDoubleClick={() => onDoubleClickNode(node)}
                    key={node.id}
                    number={i + 1}
                    node={node}
                    isSelected={selectedNode?.id === node.id}
                    onClick={() => onClickNode(node)}
                    draggable
                    onDragEnd={e => handleDragEnd(e, node)}
                    onDragMove={e => handleDragMove(e, node)}
                    isOnlyText={isOnlyText}
                />
            );
        });
    }, [nodes, selectedNode, handleDragEnd, handleDragMove, isOnlyText]);

    const handleCloseModal = useCallback(() => {
        setIsShowNodeEdit(false);
        setSelectedNode(undefined);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        mouseDownCoords.current = {
            x: e.clientX,
            y: e.clientY,
        };
    }, []);

    const handleMouseUp = useCallback((e: React.MouseEvent) => {
        isMouseDown.current = false;
        mouseUpCoords.current = offset;
    }, [offset]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isMouseDown.current) {
            setOffset({
                x: mouseUpCoords.current.x + (mouseDownCoords.current.x - e.clientX),
                y: mouseUpCoords.current.y + (mouseDownCoords.current.y - e.clientY),
            })
        }
    }, []);

    const handleMouseDownStage = useCallback((e: KonvaEventObject<MouseEvent>) => {
        isMouseDown.current = e.target.getType() === 'Stage';
    }, []);

    const handleScroll = useCallback((e: any) => {
        const isDown = Math.sign(e.deltaY) === 1;
        setScale(prev => ({
            x: prev.x + (isDown ? -0.1 : 0.1),
            y: prev.y + (isDown ? -0.1 : 0.1),
        }));
    }, []);

    return (
        <Wrapper onWheel={handleScroll} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <Stage scale={scale} onMouseDown={handleMouseDownStage} offset={offset} width={width} height={height}>
                <Layer>
                    {renderedRoutes}
                    {renderedNodes}
                </Layer>
            </Stage>
            <NodeEditModal node={selectedNode} isShow={isShowNodeEdit} onClose={handleCloseModal}/>
        </Wrapper>
    )
}
