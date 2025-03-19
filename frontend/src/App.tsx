import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Blogs from './Pages/Blogs';
import BlogDesc from './Pages/BlogDesc';
import Publish from './Pages/Publish';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<Signin />}/>
        <Route path='/blogs' element={<Blogs />}/>
        <Route path='/blog/:id' element={<BlogDesc />}/>
        <Route path='/publishblog' element={<Publish />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
