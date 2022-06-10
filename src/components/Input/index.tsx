import React, { FC, HTMLInputTypeAttribute } from 'react';
import * as ST from './styled';

interface IProps {
    value: string;
    onChange?: (value: string) => void;
    label: string;
    disabled?: boolean;
    type?: HTMLInputTypeAttribute;
}

export const Input: FC<IProps> = ({ label, value, onChange, type = 'number', disabled }) => {
    return (
        <ST.Container>
            <ST.Label>{label}</ST.Label>
            <ST.StyledInput disabled={disabled} type={type} value={value} onChange={e => onChange && onChange(e.target.value)} />
        </ST.Container>
    );
};
