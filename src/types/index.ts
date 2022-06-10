export interface INode {
    id: string;
    text: string;
    x: number;
    y: number;
    onPositiveId?: string;
    onNegativeId?: string;
    isNew?: boolean;
    isPositive?: boolean;
    isStart?: boolean;
}

export interface INodeThree {
    id: string;
    text: string;
    x: number;
    y: number;
    onPositive?: INodeThree;
    onNegative?: INodeThree;
    isNew?: boolean;
    isPositive?: boolean;
    isStart?: boolean;
}

export interface INodeData {
    text?: string;
    x?: number;
    y?: number;
    onPositiveId?: string;
    onNegativeId?: string;
    isNew?: boolean;
    isPositive?: boolean;
    isStart?: boolean;
}
