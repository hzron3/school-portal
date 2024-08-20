// Sidebar.js
import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './SideBar.css'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <Navbar bg='light' className='flex-column p-3' style={{ width: '100%' }}>
        <button
          className='btn btn-secondary mb-3'
          onClick={toggleCollapse}
          style={{ marginTop: '10px' }}
        >
          <i
            className={`bi ${
              isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'
            }`}
            style={{ fontSize: '20px' }}
          ></i>
        </button>
        <Navbar.Brand href='#home'>
          <i className='bi bi-house' style={{ fontSize: '24px' }}></i>
          {!isCollapsed && ' Home'}
        </Navbar.Brand>
        <Nav className='flex-column'>
          <Nav.Link href='#dashboard'>
            <i className='bi bi-graph-up' style={{ fontSize: '24px' }}></i>
            {!isCollapsed && ' Dashboard'}
          </Nav.Link>
          <NavDropdown
            title={
              <span>
                <i className='bi bi-person' style={{ fontSize: '24px' }}></i>
                {!isCollapsed && ' Profile'}
              </span>
            }
            id='profile-dropdown'
          >
            <NavDropdown.Item href='#profile-overview'>
              Overview
            </NavDropdown.Item>
            <NavDropdown.Item href='#profile-settings'>
              Settings
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <span>
                <i className='bi bi-gear' style={{ fontSize: '24px' }}></i>
                {!isCollapsed && ' Settings'}
              </span>
            }
            id='settings-dropdown'
          >
            <NavDropdown.Item href='#account-settings'>
              Account
            </NavDropdown.Item>
            <NavDropdown.Item href='#app-settings'>App</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    </div>
  )
}

export default Sidebar
