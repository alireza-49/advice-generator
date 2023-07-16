import { useState,useEffect,useRef } from 'react'
import { QueryClientProvider,QueryClient, useQuery } from '@tanstack/react-query'
import fetchAdvice from './fetchAdvice'
import './App.css'
import PatternMobile from './assets/pattern-divider-mobile.svg'
import PatternDesktop from './assets/pattern-divider-desktop.svg'
import icon from './assets/icon-dice.svg'


function App() {
  
  const [id,setId] = useState(1)
  const result = useQuery(['advice',id], fetchAdvice)
  const [mobile,setMobile] = useState(false)
  useEffect(() => {
    const handleWindowSize = () => {
      if (window.innerWidth <= 375){
        setMobile(true)
      }
    }
    window.addEventListener('resize', handleWindowSize)
    handleWindowSize();
    return () => {removeEventListener('resize', handleWindowSize)}
  },[])
    return (
    <div className="container">
      <div className="container-main">
        <h3 className="title">{!result.isLoading?'Advice # ' + result.data.id:null}</h3>
        <h2 className="advice-text">{result.isLoading?<img src={icon} className='loading' />:result.data.advice}</h2>
        {mobile?<img src={PatternMobile} alt="pattern" className='divider' />: <img  className='divider' src={PatternDesktop} alt="pattern" /> }
        <button className='dice' onClick={()=> {setId(Math.floor(Math.random() * 100) +1)}}><img src={icon} alt="" /></button>
        
      </div>
    </div>
  )
}

export default App
