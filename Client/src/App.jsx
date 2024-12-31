import Dashboard from './components/Dashboard';
import LeadForm from './components/Lead';
import AddContact from './components/Contact';
import { Routes,Route,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react';
import LeadDetail from './components/LeadDetail';
import Intersection from './components/Intersection';
import TodayCalls from './components/TodayCall'
import Performance from './components/Performance'
import LoginSignupPage from './components/LoginSignup';
import PrivateRoute from './components/Routes/Protected';
import axios from 'axios';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuth = JSON.parse(authData);
      if (parsedAuth?.token) {
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = parsedAuth.token; // Set token globally for Axios
      } else {
        setIsAuthenticated(false);
        navigate('/');
      }
    } else {
      setIsAuthenticated(false);
      navigate('/');
    }
  }, [navigate]);
  return (
    <Routes>
      <Route path='/' element={<LoginSignupPage />} />
      <Route element={<PrivateRoute />}>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path="/lead/:id" element={<LeadDetail />}/>
      <Route path="/addLead" element={<LeadForm />}/> 
      <Route path='/addContact/:id' element={<AddContact />}/>
      <Route path="/interaction/:id" element={<Intersection />}/>
      <Route path="/calls-today" element={<TodayCalls />} />
      <Route path="/lead/:id/performance" element={<Performance />} />
      </Route>
      <Route path="*" element={<LoginSignupPage />} />
    </Routes>
  )
}

export default App
