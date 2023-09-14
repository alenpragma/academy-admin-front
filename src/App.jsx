import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={<Sidebar />}></Route>

      </Route>
    )
  );
  

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App