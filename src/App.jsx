import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Main from './pages/main';
import Notfound from './Notfound';
import "./css/App.css"


function App() {

  return(
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Layout/>}>
          

          <Route index  element={<Main/>}  />
          <Route path='*'  element={<Notfound/>}  />

        </Route>
      </Routes>
      </BrowserRouter>
  )



}










export default App;
