import React, { FC, useRef } from 'react';
import ReactDOM from 'react-dom';
import * as ST from './styled';

interface IProps {
    title: string;
    isShow: boolean;
    onClose: () => void;
}

const Popup: FC<IProps> = ({ title, isShow, children, onClose }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        if (e.target.contains(wrapperRef.current)) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
    isShow && (
            <ST.Wrapper ref={wrapperRef} onClick={handleClick}>
                <ST.Content>
                    <ST.Header>
                        <ST.Title>{title}</ST.Title>
                        <ST.CloseIcon onClick={onClose} />
                    </ST.Header>
                    {children}
                </ST.Content>
            </ST.Wrapper>
        ),
        document.body,
    );
};

export default Popup;
