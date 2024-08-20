import { useState } from 'react'
import './Index.css'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Nav,
  ListGroup,
  Table,
  ProgressBar,
  Pagination,
} from 'react-bootstrap'
import { Pie, Bar } from 'react-chartjs-2'
import { FaBell, FaSearch, FaCheck, FaTimes } from 'react-icons/fa'
import profilePic from './linux-154544_1280.png'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
)
const Header = () => {
  return (
    <Container>
      <Row className='align-items-center'>
        {/* Welcome Back Message */}
        <Col md={4}>
          <h3 className='fw-light card-tittle'>Welcome Back Jack!</h3>
        </Col>

        {/* Search Bar and Search Button */}
        <Col md={4}>
          <Form inline className='d-flex'>
            <Form.Control
              type='text'
              placeholder='Search'
              className='mr-2'
              style={{ flex: 1 }}
            />
            <Button variant='primary' className='d-flex align-items-center'>
              <FaSearch style={{ marginRight: '' }} />
            </Button>
          </Form>
        </Col>

        {/* Notification Icon and Profile */}
        <Col md={4} className='d-flex justify-content-end align-items-center'>
          <Nav>
            <Nav.Item>
              <Nav.Link href='#'>
                <FaBell size={20} /> {/* Notification Icon */}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className='ml-3'>
              <Nav.Link href='#'>
                <img
                  src={profilePic}
                  alt='Profile'
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                  }}
                />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  )
}
const SummaryStatistics = () => {
  // Sample data
  const metrics = {
    totalStudents: 1200,
    totalTeachers: 75,
    totalClasses: 50,
    upcomingEvents: 10,
  }

  return (
    <Container>
      <Row className='my-4 mt-3'>
        <Col md={3}>
          <Card>
            <Card.Body className='card-body-custom'>
              <div className='d-flex align-items-center'>
                <i
                  className='bi bi-person-fill mr-3 text-primary p-3 icon-circle'
                  style={{ fontSize: '20px' }}
                ></i>
                <div className='ms-3'>
                  <Card.Title className='fw-light card-tittle'>
                    Total Students
                  </Card.Title>
                  <Card.Text>{metrics.totalStudents}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className='card-body-custom'>
              <div className='d-flex align-items-center'>
                <i
                  className='bi bi-person-lines-fill mr-3 text-success p-3 icon-circle'
                  style={{ fontSize: '20px' }}
                ></i>
                <div className='ms-3'>
                  <Card.Title className='fw-light card-tittle'>
                    Total Teachers
                  </Card.Title>
                  <Card.Text>{metrics.totalTeachers}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className='card-body-custom'>
              <div className='d-flex align-items-center'>
                <i
                  className='bi bi-book-fill mr-3 text-warning p-3 icon-circle'
                  style={{ fontSize: '20px' }}
                ></i>
                <div className='ms-3'>
                  <Card.Title className='fw-light card-tittle'>
                    Total Classes
                  </Card.Title>
                  <Card.Text>{metrics.totalClasses}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body className='card-body-custom'>
              <div className='d-flex align-items-center'>
                <i
                  className='bi bi-calendar-check-fill text-info p-3 icon-circle'
                  style={{ fontSize: '20px' }}
                ></i>
                <div className='ms-3'>
                  <Card.Title className='fw-light card-tittle'>
                    Upcoming Events
                  </Card.Title>
                  <Card.Text>{metrics.upcomingEvents}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
const GenderAttendance = () => {
  // Data for Pie Chart (Gender Distribution)
  const pieData = {
    labels: ['Girls', 'Boys'],
    datasets: [
      {
        data: [700, 500], // Example data
        backgroundColor: ['#ff6384', '#36a2eb'],
        borderColor: ['#ff6384', '#36a2eb'],
        borderWidth: 1,
      },
    ],
  }

  // Data for Bar Chart (School Attendance)
  const barData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Attendance',
        data: [
          1190, 1200, 1100, 1150, 1160, 1200, 1199, 1149, 1178, 1000, 1033, 50,
        ], // Example data
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        borderWidth: 1,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className='container mt-4'>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Header className='fw-light'>Gender Distribution</Card.Header>
            <Card.Body className='chart-container'>
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Header className='fw-light'>School Attendance</Card.Header>
            <Card.Body className='chart-container'>
              <Bar data={barData} options={barOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
const NoticeBoard = () => {
  const activities = [
    { name: 'John Doe', action: 'Logged in', time: '10:00 AM' },
    { name: 'Jane Smith', action: 'Updated profile', time: '10:15 AM' },
    { name: 'Alice Johnson', action: 'Added a new post', time: '10:30 AM' },
    { name: 'Bob Brown', action: 'Commented on a post', time: '10:45 AM' },
    { name: 'Charlie White', action: 'Liked a post', time: '11:00 AM' },
    { name: 'Dana Black', action: 'Logged out', time: '11:15 AM' },
    { name: 'John Doe', action: 'Logged in', time: '10:00 AM' },
    { name: 'Jane Smith', action: 'Updated profile', time: '10:15 AM' },
    { name: 'Alice Johnson', action: 'Added a new post', time: '10:30 AM' },
    { name: 'Bob Brown', action: 'Commented on a post', time: '10:45 AM' },
    { name: 'Charlie White', action: 'Liked a post', time: '11:00 AM' },
    { name: 'Dana Black', action: 'Logged out', time: '11:15 AM' },
    // Add more activities as needed
  ]

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(activities.length / itemsPerPage)

  // Get the current items to display based on the current page
  const currentActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <Container>
      <Row className='mt-4'>
        <Col md={8} className='mb-4'>
          <Card className='border-0 shadow-sm hover-bg-light-blue'>
            <Card.Header className='bg-custom text-dark fw-light'>
              Recent Activities
            </Card.Header>
            <Card.Body>
              <Table table-hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.name}</td>
                      <td>{activity.action}</td>
                      <td>{activity.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                <Pagination.Prev
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>

        {/* Second Column: Event Calendar */}
        <Col md={4}>
          <Card>
            <Card.Header className=' fw-light text-dark'>
              Quick Links
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <a href='#link1' className='text-decoration-none text-dark'>
                  Link 1
                </a>
                <i className='bi bi-box-arrow-up-right float-end text-primary' />
              </ListGroup.Item>
              <ListGroup.Item>
                <a href='#link2' className='text-decoration-none text-dark'>
                  Link 2
                </a>
                <i className='bi bi-box-arrow-up-right float-end text-primary' />
              </ListGroup.Item>
              <ListGroup.Item>
                <a href='#link3' className='text-decoration-none text-dark'>
                  Link 3
                </a>
                <i className='bi bi-box-arrow-up-right float-end text-primary' />
              </ListGroup.Item>
              <ListGroup.Item>
                <a href='#link4' className='text-decoration-none text-dark'>
                  Link 4
                </a>
                <i className='bi bi-box-arrow-up-right float-end text-primary' />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
const ActivitiesNotification = () => {
  const data = [
    {
      name: 'Horizon UI Free',
      status: 'Approved',
      date: '18 Apr 2022',
      progress: 70,
    },
    { name: 'Disable', status: 'Error', date: '18 Apr 2022', progress: 20 },
    { name: 'Marketplace', status: 'Error', date: '20 May 2021', progress: 40 },
    {
      name: 'Weekly Updates',
      status: 'Approved',
      date: '12 Jul 2021',
      progress: 90,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <FaCheck className='text-success' />
      case 'Error':
        return <FaTimes className='text-danger' />
      default:
        return null
    }
  }

  return (
    <Container className='py-4'>
      <Row>
        <Col md={8} className='mb-4 card'>
          <div className='mt-2'>
            <h2 className='text-dark fw-light card-tittle'>Requests</h2>
          </div>
          <Table hover responsive className='table table-hover'>
            <thead className='bg-primary text-white'>
              <tr className='bg-primary'>
                <th className='fw-light'>NAME</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td className='d-flex align-items-center'>
                    {getStatusIcon(item.status)}{' '}
                    <span className='ms-2'>{item.status}</span>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <ProgressBar
                      className='progress-bar-container'
                      now={item.progress}
                      variant='primary'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        {/* Notifications Column */}
        <Col md={4} className='mb-4'>
          <Card className='border-0 shadow-sm hover-bg-light-blue'>
            <Card.Header className='text-dark fw-light'>
              Notifications
            </Card.Header>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>Notification 1</ListGroup.Item>
                <ListGroup.Item>Notification 2</ListGroup.Item>
                <ListGroup.Item>Notification 3</ListGroup.Item>
                <ListGroup.Item>Notification 4</ListGroup.Item>
                <ListGroup.Item>Notification 5</ListGroup.Item>
                <ListGroup.Item>Notification 6</ListGroup.Item>
                {/* Add more notifications here */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
const Index = () => {
  return (
    <div className='Container-fluid'>
      <Header />
      <SummaryStatistics />
      <GenderAttendance />
      <ActivitiesNotification />
      <NoticeBoard />
    </div>
  )
}

export default Index
