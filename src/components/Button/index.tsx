import React, { FC } from 'react';
import * as ST from './styled';
import { BtnTypes } from './styled';

interface IProps {
    btnType?: BtnTypes;
    onClick?: () => void;
}

const Button: FC<IProps> = ({btnType = BtnTypes.success, children, onClick}) => {
    return (
        <ST.Container btnType={btnType} onClick={onClick}>
            {children}
        </ST.Container>
    );
};

export default Button;
