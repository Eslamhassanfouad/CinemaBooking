import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { MovieCart } from './components/MovieCart';


function App() {
  return (
    <div className="App">
      
       <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' exact element={<Register/>} />
          <Route path='/test' exact element={<MovieCart/>} />
        </Routes>
    
    </div>
  );
}

export default App;