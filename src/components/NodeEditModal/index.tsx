import React, { FC, useState } from 'react';
import Popup from 'src/components/Popup';
import Input from 'src/components/Input';
import { useActions } from 'src/hooks/useActions';
import Button from '../Button';
import { BtnTypes } from 'src/components/Button/styled';
import styled from 'styled-components';

interface IProps {
    isShow: boolean;
    onClose: () => void;
    nodeId?: string;
}

const Row = styled.div`
  display: flex;
  column-gap: 10px;
  width: 100%;
  margin-top: 24px;
`;

const NodeEditPopup: FC<IProps> = ({ isShow, onClose, nodeId }) => {
    const { deleteNode } = useActions();

    const remove = () => {
        if (nodeId) {
            deleteNode(nodeId);
            onClose();
        }
    }

    return (
        <Popup isShow={isShow} onClose={onClose} title="Edit node">
            <Input disabled value={nodeId} label={`ID: ${nodeId}`} />
            <Row>
                <Button>Save</Button>
                <Button btnType={BtnTypes.error} onClick={remove}>Delete</Button>
            </Row>
        </Popup>
    );
};

export default NodeEditPopup;
