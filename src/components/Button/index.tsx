import React, { FC, PropsWithChildren } from 'react';
import { BtnTypes } from './styled';
import * as ST from './styled';

interface IProps extends PropsWithChildren {
    btnType?: BtnTypes;
    onClick?: () => void;
}

export const Button: FC<IProps> = ({btnType = BtnTypes.success, children, onClick}) => {
    return (
        <ST.Container btnType={btnType} onClick={onClick}>
            {children}
        </ST.Container>
    );
};

export { BtnTypes } from './styled';
