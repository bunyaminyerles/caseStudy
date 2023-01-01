import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from "react-query";
import {persistor, store} from './redux/store'
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
);

