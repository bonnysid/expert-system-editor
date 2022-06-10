import React from 'react';
import { BUTTONS } from './data';
import * as ST from './styled';
import { useLocation } from 'react-router-dom';
import { useNode } from '../../providers';
import { RouteNames } from '../../router/routes';

export const Navbar = () => {
    const { isOnlyText, toggleOnlyText } = useNode();
    const { pathname } = useLocation();

    return (
        <ST.Container>
            <ST.ButtonsContainer>
                {BUTTONS.map(btn => (
                    <ST.ButtonLink isActive={pathname === btn.to} key={btn.to} to={btn.to}>
                        {btn.text}
                    </ST.ButtonLink>
                ))}
                {pathname === RouteNames.EDITOR && <ST.Button isActive={isOnlyText} onClick={toggleOnlyText}>Text View</ST.Button>}
            </ST.ButtonsContainer>
        </ST.Container>
    );
};

export * from './data'
