import React from 'react';
import ReactDOM from 'react-dom/client';
import {StoreProvider} from 'easy-peasy';
import reportWebVitals from './reportWebVitals';
import {store} from "./store";
import {Home} from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WordData} from "./components/WordData";

type Props = StoreProvider["props"] & { children: React.ReactNode }
const StoreProviderCasted = StoreProvider as unknown as React.ComponentType<Props>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StoreProviderCasted store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/6_semester_front" element={<Home />} />
          <Route path="/6_semester_front/:word" element={<WordData />} />
        </Routes>
      </BrowserRouter>
    </StoreProviderCasted>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
