import './App.css'
import 
{BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import Cars from './Pages/Cars';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Login from './Pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="app">
      <ToastContainer position='bottom-center' limit={1} />
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/cars/:carId' element={<Cars/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
