// StudentDirectory.js
import React, { useState, useRef } from 'react'
import initialStudents from './initialStudents'
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Button,
  Pagination,
  Modal,
} from 'react-bootstrap'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Sample student data
// const initialStudents =

const PAGE_SIZE = 10 // Number of rows per page

const StudentDirectory = () => {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedForm, setSelectedForm] = useState('All')
  const [selectedGender, setSelectedGender] = useState('All')
  const [editRowId, setEditRowId] = useState(null)
  const [editStudent, setEditStudent] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [previewType, setPreviewType] = useState('filtered') // 'all' or 'filtered'
  const [pdfContent, setPdfContent] = useState(null)
  const tableRef = useRef()

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  const handleFormFilterChange = (e) => setSelectedForm(e.target.value)

  const handleGenderFilterChange = (e) => setSelectedGender(e.target.value)

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditStudent((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleEditClick = (student) => {
    setEditRowId(student.id)
    setEditStudent({ ...student })
  }

  const handleSaveClick = () => {
    setStudents((prevState) =>
      prevState.map((student) =>
        student.id === editStudent.id ? editStudent : student
      )
    )
    setEditRowId(null)
  }

  const handlePrintPreview = (type) => {
    setPreviewType(type)
    const contentId = type === 'all' ? 'printable' : 'filtered'
    setPdfContent(document.getElementById(contentId).innerHTML)
    setShowPreview(true)
  }

  const exportToPDF = () => {
    const pdf = new jsPDF()
    const printContent = document.getElementById('pdf-preview')

    if (!printContent) {
      console.error('PDF Preview content not found!')
      return
    }

    html2canvas(printContent, { useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = 210 // A4 size width in mm
        const pageHeight = 295 // A4 size height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        let heightLeft = imgHeight

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        heightLeft -= pageHeight

        while (heightLeft >= 0) {
          pdf.addPage()
          pdf.addImage(imgData, 'PNG', 0, -heightLeft, imgWidth, imgHeight)
          heightLeft -= pageHeight
        }
        pdf.save('students.pdf')
      })
      .catch((error) => {
        console.error('Error generating PDF:', error)
      })

    setShowPreview(false)
  }

  const filteredStudents = students.filter((student) => {
    return (
      (student.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedForm === 'All' || student.form === selectedForm) &&
      (selectedGender === 'All' || student.gender === selectedGender)
    )
  })

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE)

  // Generate HTML for PDF that does not include the Edit column
  const generatePDFContent = (students) => {
    return `
      <table table-bordered style="width: 100%; border-collapse: collapse;" border="1">
        <thead>
          <tr>
            <th>No.</th>
            <th>RegNo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          ${students
            .map(
              (student, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${student.regNo}</td>
              <td>${student.firstName}</td>
              <td>${student.lastName}</td>
              <td>${student.gender}</td>
              <td>${student.form}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `
  }

  return (
    <Container>
      <Row className='my-3'>
        <Col md={4}>
          <Form.Control
            type='text'
            placeholder='Search by RegNo or Name'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={selectedForm} onChange={handleFormFilterChange}>
            <option value='All'>All Forms</option>
            <option value='Form 1'>Form 1</option>
            <option value='Form 2'>Form 2</option>
            <option value='Form 3'>Form 3</option>
            <option value='Form 4'>Form 4</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedGender}
            onChange={handleGenderFilterChange}
          >
            <option value='All'>All Genders</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col>
          <Button
            onClick={() => handlePrintPreview(previewType)}
            variant='primary'
            className='mt-2'
          >
            Export PDF
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            id='filtered'
            ref={tableRef}
            style={{ display: previewType === 'filtered' ? 'block' : 'none' }}
          >
            <Table bordered>
              <thead>
                <tr>
                  <th className='fw-light'>No.</th>
                  <th>RegNo</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Class</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                      <td>
                        {editRowId === student.id ? (
                          <Form.Control
                            type='text'
                            name='regNo'
                            value={editStudent.regNo}
                            onChange={handleEditChange}
                          />
                        ) : (
                          student.regNo
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <Form.Control
                            type='text'
                            name='firstName'
                            value={editStudent.firstName}
                            onChange={handleEditChange}
                          />
                        ) : (
                          student.firstName
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <Form.Control
                            type='text'
                            name='lastName'
                            value={editStudent.lastName}
                            onChange={handleEditChange}
                          />
                        ) : (
                          student.lastName
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <Form.Select
                            name='gender'
                            value={editStudent.gender}
                            onChange={handleEditChange}
                          >
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                          </Form.Select>
                        ) : (
                          student.gender
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <Form.Select
                            name='form'
                            value={editStudent.form}
                            onChange={handleEditChange}
                          >
                            <option value='Form 1'>Form 1</option>
                            <option value='Form 2'>Form 2</option>
                            <option value='Form 3'>Form 3</option>
                            <option value='Form 4'>Form 4</option>
                          </Form.Select>
                        ) : (
                          student.form
                        )}
                      </td>
                      <td>
                        {editRowId === student.id ? (
                          <Button variant='success' onClick={handleSaveClick}>
                            <i class='bi bi-check2-square'></i>
                          </Button>
                        ) : (
                          <Button
                            className='bg-primary'
                            onClick={() => handleEditClick(student)}
                          >
                            <i class='bi bi-pencil-square text-white'></i>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='7'>No students found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div
            id='printable'
            style={{ display: previewType === 'all' ? 'block' : 'none' }}
          >
            <Table bordered>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>RegNo</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.regNo}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.gender}</td>
                      <td>{student.form}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6'>No students found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className='d-flex justify-content-center'>
            <Pagination>
              <Pagination.Prev
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </Col>
      </Row>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>PDF Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id='pdf-preview'>
            <Table bordered>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>RegNo</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.regNo}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.gender}</td>
                      <td>{student.form}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6'>No students found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowPreview(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={exportToPDF}>
            Download PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default StudentDirectory
