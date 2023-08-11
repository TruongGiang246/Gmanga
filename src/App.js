import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import { publicRoutes } from './router';
import DefaultLaypout from './component/NavBar/Navbar'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          let Layout = DefaultLaypout
          if(route.layout){
            Layout = route.layout
          }else if(route.layout === null){
            Layout = React.Fragment
          }

          return <Route key={index} path={route.path} element = {
            <Layout>
                <Page/>
            </Layout>
          }/>
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
