import React, { FC, useEffect, useState } from 'react';
import { Input, BtnTypes, Button, Modal } from '../../components';
import { useNode } from '../../providers';
import styled from 'styled-components';
import { INode } from '../../types';

interface IProps {
    isShow: boolean;
    onClose: () => void;
    node?: INode;
}

const Row = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  margin-top: 24px;
`;

export const NodeEditModal: FC<IProps> = ({ isShow, onClose, node }) => {
    const [text, setText] = useState(node?.text || '');
    const { removeNode, updateNode } = useNode();

    const remove = () => {
        removeNode(node?.id || '');
        onClose();
    }

    const save = () => {
        updateNode(node?.id || '', { text });
        onClose();
    }

    useEffect(() => {
        if (node) {
            setText(node.text);
        }
    }, [node]);

    return (
        <Modal isShow={isShow} onClose={onClose} title="Edit node">
            <Input type={'text'} disabled value={''} label={`ID: ${node?.id}`} />
            <Input type={'text'} value={text} label={`Text`} onChange={setText} />
            <Row>
                <Button onClick={save}>Save</Button>
                <Button btnType={BtnTypes.error} onClick={remove}>Delete</Button>
            </Row>
        </Modal>
    );
};
