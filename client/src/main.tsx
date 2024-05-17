import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './home.tsx'
import Graphs from './graphs.tsx'
import Parameters from './parameters.tsx'
import YourGraph from './yourgraph.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/graphs", element: <Graphs /> },
  { path: "/parameters", element: <Parameters />},
  { path: "/yourgraph", element: <YourGraph />}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
