import React from 'react';
import { MainPage, EditorPage } from '../pages';

interface IRoute {
    path: string;
    exact?: boolean;
    element: React.ReactElement;
}

export enum RouteNames {
    MAIN = '/',
    EDITOR = '/editor',
}

export const routes: IRoute[] = [
    { path: RouteNames.MAIN, element: <MainPage />, exact: true },
    { path: RouteNames.EDITOR, element: <EditorPage />, exact: true },
];
