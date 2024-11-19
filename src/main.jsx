import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles/main.scss'
import { CartProvider } from 'react-use-cart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
