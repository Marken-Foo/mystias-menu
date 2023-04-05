import * as React from 'react';

import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { App } from '@/App';
import { ErrorPage } from '@/ErrorPage';
import { Drinks } from '@/routes/Drinks';
import { Recipes } from '@/routes/Recipes';
import '@/i18n';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route path="/" element={<Recipes />}></Route>
        <Route path="/drinks" element={<Drinks />}></Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
