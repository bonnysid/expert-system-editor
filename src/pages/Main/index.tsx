import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import * as ST from './styled';
import { useNode } from '../../providers';
import { INode } from '../../types';
import { BtnTypes, Button } from '../../components';

export const MainPage: FC = () => {
    const [currentNode, setCurrentNode] = useState<INode>();
    const {nodes, findNode} = useNode();

    const handleAgree = useCallback(() => {
        if (currentNode) {
            const nextNode = findNode(currentNode.onPositiveId || '');
            setCurrentNode(nextNode);
        }
    }, [nodes, currentNode]);

    const handleDisagree = useCallback(() => {
        if (currentNode) {
            const nextNode = findNode(currentNode.onNegativeId || '');
            setCurrentNode(nextNode);
        }
    }, [nodes, currentNode]);

    const isResult = useMemo(() => {
        if (currentNode) {
            const negNode = findNode(currentNode.onNegativeId || '');
            const posNode = findNode(currentNode.onPositiveId || '');

            return (!negNode && !posNode) || negNode?.isNew && posNode?.isNew;
        }
    }, [nodes, currentNode]);

    const restart = useCallback(() => {
        const startNode = nodes.find(it => it.isStart);
        setCurrentNode(startNode);
    }, [nodes]);

    useEffect(() => {
        const startNode = nodes.find(it => it.isStart);
        setCurrentNode(startNode);
    }, []);

    return (
        <ST.Wrapper>
            <ST.Block>
                {!isResult && <ST.Question>{currentNode?.text}</ST.Question>}
                {isResult && <ST.Result>Я думаю это - {currentNode?.text}</ST.Result>}
                <ST.ButtonsContainer>
                    {isResult ? (
                        <>
                            <Button onClick={restart}>Начать заново</Button>
                        </>
                    ) : (
                        <>
                            <Button btnType={BtnTypes.success} onClick={handleAgree}>Да</Button>
                            <Button btnType={BtnTypes.error} onClick={handleDisagree}>Нет</Button>
                        </>
                    )
                    }
                </ST.ButtonsContainer>
            </ST.Block>
        </ST.Wrapper>
    )
}
