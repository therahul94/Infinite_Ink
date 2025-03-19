import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css'
const Signup = lazy(()=>import('./Pages/Signup'));
const Signin = lazy(()=>import('./Pages/Signin'));
const Blogs = lazy(() => import('./Pages/Blogs'));
const BlogDesc = lazy(() => import('./Pages/BlogDesc'));
const Publish = lazy(() => import('./Pages/Publish'));
import { SkeletonsList } from './Pages/Blogs';
import BlogDescSkeleton from './Components/BlogDescSkeleton';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/blogs' element={
            <Suspense fallback={
              <SkeletonsList />
            }>
              <Blogs />
            </Suspense>
          } />
          <Route path='/blog/:id' element={
            <Suspense fallback={
              <BlogDescSkeleton />
            }>
              <BlogDesc />
            </Suspense>
          } />
          <Route path='/publishblog' element={
            <Suspense fallback={<>loading...</>}>
              <Publish />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
