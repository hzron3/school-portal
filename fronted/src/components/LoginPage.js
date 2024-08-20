import React from 'react'
import './customstyles/LoginPage.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit'

function LoginPage() {
  return (
    <MDBContainer className='my-5 gradient-form'>
      <MDBRow className='g-0 justify-content-between'>
        <MDBCol md='5' className='mb-5'>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <div className='text-center'>
              <img
                src='http://localhost/schoolportal/wp-content/uploads/2024/08/SCHOOL-LOGO.png'
                style={{ width: '185px' }}
                alt='logo'
              />
              {/* <h4 className='display-6 fw-light mt-1 mb-5 pb-1'>
                Nurturing talent and fostering innovation.
              </h4> */}
            </div>

            <p className='text-center'>Please login to your account</p>

            <MDBInput
              wrapperClass='mb-4 w-100'
              label='Email address'
              id='form1'
              type='email'
            />
            <MDBInput
              wrapperClass='mb-4 w-100'
              label='Password'
              id='form2'
              type='password'
            />

            <div className='text-center pt-1 mb-5 pb-1'>
              <MDBBtn className='mb-4 w-100 gradient-custom-2'>Sign in</MDBBtn>
              <a className='text-muted' href='#!'>
                Forgot password?
              </a>
            </div>

            <div className='d-flex flex-row align-items-center justify-content-center pb-4 mb-4'>
              <p className='mb-0'>
                Don't have an account?{' '}
                <a href='#!' class='link-info'>
                  Register here
                </a>
              </p>
            </div>
          </div>
        </MDBCol>

        <MDBCol md='6' className='d-none d-md-flex mb-5'>
          <div className='gradient-custom-2 h-100'></div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default LoginPage
