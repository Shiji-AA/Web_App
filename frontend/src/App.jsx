import{BrowserRouter as Router , Routes,Route} from 'react-router-dom'
import Register from './components/User/Register'
import Login from './components/User/Login'
import { Toaster } from 'react-hot-toast'
import HomePage from './Pages/HomePage'
import PrivatePages from './components/User/PrivatePages/PrivatePages'
import AddNote from './components/User/PrivatePages/AddNote'
import ListNotes from './components/User/ListNotes'
import EditNote from './components/User/EditNote'



function App() {
  return (
    <Router>
      <Toaster position='top-right'/>
      <Routes>      
          <Route path='/register' element={< Register/>}   />
          <Route path='/login' element={<Login/>}   />   
 <Route path='/addnote' element={<AddNote/>}   /> 
 <Route path='/listnotes' element={<ListNotes/>}   /> 
 <Route path='/editNote/:id' element={<EditNote/>}   /> 


          <Route element={<PrivatePages/>}>
   <Route path='/' element={<HomePage/>}   /> 
     
          </Route>
        
      </Routes>
    </Router> 
  )}
export default App