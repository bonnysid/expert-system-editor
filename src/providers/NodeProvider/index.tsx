import { INode, INodeData } from '../../types';
import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

const LS_KEY = 'node';

export interface INodeContext {
    nodes: INode[];
    isOnlyText: boolean;
    toggleOnlyText: () => void;
    addNodes: (...node: INode[]) => void;
    createNode: (id: string, isPositive?: boolean) => void;
    removeNode: (id: string) => void;
    findNode: (id: string) => INode | undefined;
    findNodeParent: (id: string) => INode | undefined;
    updateNode: (id: string, data: INodeData) => void;
    onMove: (node: INode, x: number, y: number) => void;
}

export const NodeContext = createContext<INodeContext>({
    nodes: [],
    removeNode: () => {},
    updateNode: () => {},
    findNode: () => { return undefined },
    findNodeParent: () => { return undefined },
    addNodes: () => {},
    createNode: () => {},
    onMove: () => {},
    isOnlyText: false,
    toggleOnlyText: () => {},
});

export const useNode = () => {
    return useContext(NodeContext);
}

const getData = () => {
    const storageData = localStorage.getItem(LS_KEY);
    if (storageData) {
        return JSON.parse(storageData);
    }
}

const initialNodePositive: INode = {
    id: v4(),
    text: 'Your text',
    x: window.innerWidth / 2 - 50,
    y: 200,
    isNew: true,
    isPositive: true,
}

const initialNodeNegative: INode = {
    id: v4(),
    text: 'Your text',
    x: window.innerWidth / 2 + 50,
    y: 200,
    isNew: true,
}

const initialNode: INode = {
    id: v4(),
    x: window.innerWidth / 2,
    y: 100,
    text: 'Test',
    onNegativeId: initialNodeNegative.id,
    onPositiveId: initialNodePositive.id,
    isStart: true,
}

export const NodeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [nodes, setNodes] = useState<INode[]>(() => {
        const data = getData();
        return data || [initialNode, initialNodePositive, initialNodeNegative];
    });
    const [isOnlyText, setIsOnlyText] = useState(false);

    const findNode = useCallback((id: string): INode | undefined => {
        return nodes.find(it => it.id === id);
    }, [nodes]);

    const findNodeParent = useCallback((id: string): INode | undefined => {
        return nodes.find(it => it.onPositiveId === id || it.onNegativeId === id);
    }, [nodes]);

    const updateNode = useCallback((id: string, data: INodeData) => {
        setNodes(prev => prev.map(it => {
            const isNeed = it.id === id;
            return isNeed ? {...it, ...data} : it;
        }));
    }, []);

    const moveNode = useCallback((node: INode, x: number, y: number, final: boolean = true): INode[] | INode => {
        const res: INode[] = [];
        const divX = node.x - x;
        const divY = node.y - y;
        node.x = x;
        node.y = y;
        const positiveNode = nodes.find(it => it.id === node.onPositiveId);
        const negativeNode = nodes.find(it => it.id === node.onNegativeId);
        if (positiveNode) {
            res.push(moveNode(positiveNode, positiveNode.x - divX, positiveNode.y - divY, false) as INode);
        }
        if (negativeNode) {
            res.push(moveNode(negativeNode, negativeNode.x - divX, negativeNode.y - divY, false) as INode);
        }
        if (final) {
            return res;
        } else {
            return node;
        }
    }, [nodes])

    const onMove = useCallback((node: INode, x: number, y: number) => {
        const res = moveNode(node, x, y);
        setNodes([...nodes]);
    }, [moveNode, nodes])

    const addNodes = useCallback((...nodes: INode[]) => {
        setNodes(prev => [...prev, ...nodes]);
    }, []);

    const createNode = useCallback((id: string) => {
        const needNode = findNode(id);
        if (needNode) {
            const positiveNode: INode = {
                id: v4(),
                text: 'Your text',
                x: needNode.x - 50,
                y: needNode.y + 100,
                isNew: true,
                isPositive: true,
            };
            const negativeNode: INode = {
                id: v4(),
                text: 'Your text',
                x: needNode.x + 50,
                y: needNode.y + 100,
                isNew: true,
                isPositive: false,
            };
            addNodes(positiveNode, negativeNode);
            updateNode(id, { isNew: false, isPositive: needNode.isPositive, onNegativeId: negativeNode.id, onPositiveId: positiveNode.id });
        }
    }, [findNodeParent]);

    const recalculatePositions = useCallback((node?: INode, parentX?: number, div: number = 50) => {
        if (node && parentX) {
            node.x = node.isPositive ? parentX - div : parentX + div;
            const positiveNode = nodes.find(it => it.id === node.onPositiveId);
            const negativeNode = nodes.find(it => it.id === node.onNegativeId);
            if (positiveNode) {
                recalculatePositions(positiveNode, node.x);
            }
            if (negativeNode) {
                recalculatePositions(negativeNode, node.x);
            }
            return node;
        }
    }, [nodes])

    const removeNode = useCallback((id: string, res: INode[] = nodes, isFinal = true) => {
        const node = res.find(it => it.id === id);
        const parent = findNodeParent(id);

        if (node) {
            if (parent) {
                if (node.isPositive) {
                    const positiveNode: INode = {
                        id: v4(),
                        text: 'Your text',
                        x: parent.x - 50,
                        y: parent.y + 100,
                        isNew: true,
                        isPositive: true,
                    };
                    res.push(positiveNode);
                    parent.onPositiveId = positiveNode.id;
                } else {
                    const negativeNode: INode = {
                        id: v4(),
                        text: 'Your text',
                        x: parent.x + 50,
                        y: parent.y + 100,
                        isNew: true,
                    };
                    parent.onNegativeId = negativeNode.id;
                    res.push(negativeNode);
                }
            }
            res = res.filter(it => it.id !== id);
            const posNode = res.find(it => it.id === node.onPositiveId);
            const negNode = res.find(it => it.id === node.onNegativeId);

            if (posNode) {
                removeNode(posNode.id, res, false);
            }

            if (negNode) {
                removeNode(negNode.id, res, false);
            }
        }
        if (isFinal) {
            clearNodes(res);
        }
    }, [nodes, findNode, findNodeParent]);

    const saveData = () => {
        localStorage.setItem(LS_KEY, JSON.stringify(nodes));
    }

    const clearNodes = (nodes: INode[]) => {
        setNodes(prev => prev.filter(it => Boolean(findNodeParent(it.id)) || it.isStart));
    }

    useEffect(() => {
        const data = getData();

        if (data) {
            setNodes(data);
        }
    }, []);

    useEffect(() => {
        saveData();
    }, [nodes]);

    return (
        <NodeContext.Provider value={{
            nodes,
            addNodes,
            createNode,
            findNode,
            removeNode,
            findNodeParent,
            updateNode,
            onMove,
            isOnlyText,
            toggleOnlyText: () => setIsOnlyText(prev => !prev),
        }}>
            {children}
        </NodeContext.Provider>
    );
}

