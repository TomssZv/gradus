import { Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';

function App() {

  const ProtectedRoute = ({user}) => {
    if (!user) {
      return <Navigate to='/login' replace />
    }
    return <Outlet />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<NotFound />}/>
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path='/profile' element={<Profile />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
