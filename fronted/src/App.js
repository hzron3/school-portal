import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'boxicons/css/boxicons.min.css'
import AdminDashboard from './components/admin/AdminDashboard'
// import LoginPage from './components/LoginPage'
import SideBar from './components/sidebar/SideBar'
import StudentDirectory from './components/admin/student_folder/StudentDirectory'
const App = () => {
  return (
    <div className=''>
      {/* <StudentDirectory /> */}
      {/* <AdminDashboard /> */}
      <SideBar />
    </div>
  )
}

export default App
