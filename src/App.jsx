// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { FilterProvider } from './context/FilterContext';
import AuthProviderWrapper from './context/AuthProviderWrapper';
import './App.css';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import VerifyEmail from './pages/VerifyEmail';
import Filter from './components/Filter';
import Data1 from './pages/Data1';
import NewBusiness from './components/MyForm';
import DeletStorage from './components/DeletStorage'
//import GoogleSignIn from './pages/GoogleSignIn';
//import OAuthCallback from './pages/OAuthCallback';

const App = () => {
  return (
    <AuthProviderWrapper>
     {/* <FilterProvider>*/}
        <div className="App flex flex-col min-h-screen">
        
        <div className="bg-blue-900 p-1 fixed inset-x-0  top-0 text-2xl  text-blue-50 font-bold">
  Jain's Bharuch
</div>
          <Header />
          <main className="flex-grow">
           {/* <Filter/>*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route path="/data1" element={<Data1 />} />
              <Route path="/new_business" element={<NewBusiness/>}/>
              <Route path="/admin" element={<DeletStorage/>}/>
             {/* <Route path="/google-signin" element={<GoogleSignIn />} />
              <Route path="/oauth2/callback" element={<OAuthCallback />} />*/}
            </Routes>
          </main>
         {/* <Footer />*/}
        </div>
     {/* </FilterProvider>*/}
    </AuthProviderWrapper>
  );
};

export default App;
