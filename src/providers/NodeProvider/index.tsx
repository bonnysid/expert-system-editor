import { INode } from '../../types';
import { createContext } from 'react';

export interface INodeContext {
    node: INode;
}

export const NodeContext = createContext<INodeContext>({
    node: {

    }
})
