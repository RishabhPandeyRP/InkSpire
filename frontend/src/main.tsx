import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
//@ts-ignore
import ContextProvider from './context/ContextProvider.tsx'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  
    
  //@ts-ignore
    <ContextProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ContextProvider>
  
  
)
