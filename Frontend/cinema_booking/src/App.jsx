import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
        </Routes>
    
    </div>
  );
}

export default App;