import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css'
const Signup = lazy(() => import('./Pages/Signup'));
const Signin = lazy(() => import('./Pages/Signin'));
const Blogs = lazy(() => import('./Pages/Blogs'));
const BlogDesc = lazy(() => import('./Pages/BlogDesc'));
const Publish = lazy(() => import('./Pages/Publish'));
import { SkeletonsList } from './Pages/Blogs';
import BlogDescSkeleton from './Components/BlogDescSkeleton';
import Spinner from './Components/Spinner';
const Landing = lazy(() => import('./Pages/Landing'));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Suspense fallback={
              <SpinnerFallback />
            }>
              <Landing />
            </Suspense>
          } />
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
            <Suspense fallback={<SpinnerFallback />}>
              <Publish />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function SpinnerFallback() {
  return <div className='h-screen w-full flex justify-center items-center'><Spinner /></div>
}

export default App
