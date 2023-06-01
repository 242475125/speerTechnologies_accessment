import './css/body.css';
import './css/app.css';
import './css/header.css';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import {Provider} from "react-redux";
import {store} from "./app/store";

const domNode = document.getElementById('app');
const root = createRoot(domNode);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

