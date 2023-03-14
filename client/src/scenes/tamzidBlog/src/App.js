import logo from './logo.svg';
import './App.css';
import Login from './components/account/login';
import DataProvider from './constants/context/DataProvider';
import Home from './components/account/home/home';
import { BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  return (
    
      <DataProvider>
        <BrowserRouter>
       
        <div style={{marginTop: 60}}>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Home/>} />
          </Routes>
          
        </div>
        </BrowserRouter>
        
      </DataProvider>
      
       
    
  );
}

export default App;
