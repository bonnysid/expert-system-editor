import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles, AppWrapper } from './styled';
import AppRouter from './router';
import { Navbar } from './components';
import { NodeProvider } from './providers';

const App: FC = () => {
    return (
        <BrowserRouter>
            <NodeProvider>
                <GlobalStyles/>
                <AppWrapper>
                    <Navbar/>
                    <AppRouter/>
                </AppWrapper>
            </NodeProvider>
        </BrowserRouter>
    );
}

export default App;
