import{BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Register from './components/User/Register'
import Login from './components/User/Login'
import { Toaster } from 'react-hot-toast'



function App() {
  return (
    <Router>
      <Toaster position='top-right'/>
      <Routes>      
          <Route path='/register' element={< Register/>}   />
          <Route path='/login' element={<Login/>}   />   
      </Routes>
    </Router> 
  )}
export default App