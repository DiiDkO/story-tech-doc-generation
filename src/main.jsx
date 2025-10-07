import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.headers.put["Content-Type"] = "application/json"

  axios.defaults.baseURL = '/'
  axios.defaults.headers["X-UserToken"] = window.serviceNowUserToken
  axios.request.data = {
    table: window.servicenowTable,
    sys_id: window.servicenowRecordId
  }
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
