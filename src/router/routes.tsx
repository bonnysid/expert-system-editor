import React from 'react';
import Main from '../pages/Main';

interface IRoute {
    path: string;
    exact?: boolean;
    element: React.ReactElement;
}

export enum RouteNames {
    MAIN = '/',
    THEME_PAGE = '/:theme',
}

export const routes: IRoute[] = [
    { path: RouteNames.MAIN, element: <Main />, exact: true },
];
