import * as React from 'react';

import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from '@/App';
import '@/i18n';
import { ErrorPage } from '@/ErrorPage';
import { Drinks } from '@/routes/Drinks';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}></Route>
      <Route path="/drinks" element={<Drinks />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
