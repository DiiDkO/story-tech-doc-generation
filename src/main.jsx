import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.headers.put["Content-Type"] = "application/json"
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  const username = 'daniel.bogoev@nuvolo.com'
  const password = 'Nuvolo134@'
  axios.defaults.auth = {
    username,
    password
  }
  axios.defaults.baseURL = 'https://ven03517.service-now.com';
  
} else {
  axios.defaults.headers["X-UserToken"] = window.servicenowUserToken
  axios.request.data = {
    table: window.servicenowTable,
    sys_id: window.servicenowRecordId
  }
}

 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
