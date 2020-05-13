import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Row, 
  Col,
  Table,
  ButtonGroup 
} from 'reactstrap';
import api from './api'

const DBTable = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  

  useEffect( () => {
    setIsLoading(true)
    const fetchData = async () => {
      const result = await api.getAllMeters()
      .then(result => setData(result.data.data), setIsLoading(false))
  
    }
    fetchData()
  
  }, [])

  let db = data.sort(function(a,b) {
    return a.meterStart - b.meterStart
  })

  const legend = [
    "Start",
    "",
    "",
    "End",
    "",
    "",
    "Result",
    "",
    ""
  ]

  const headers = [
    "Date",
    "Time",
    "Meter",
    "Date",
    "Time",
    "Meter",
    "Acre/Feet",
    "Inches/Acre",
    "hours"
  ]

  return (
    <Row>
      <Col sm="12" md={{ size: 10, offset: 1}}>
        <div className="container mt-5">
          <Table>
            <thead>
              <tr>
                {legend.map((item, idx)=> (
                    <th key={idx}>{item}</th>
                  ))
                }
              </tr>
            </thead>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {!!db &&
                db.reverse().map(data => (
                <tr key={data._id}>
                  <td>{data.start}</td>
                  <td>{data.timeStart}</td>
                  <td>{data.meterStart}</td>
                  <td>{data.end}</td>
                  <td>{data.timeEnd}</td>
                  <td>{data.meterEnd}</td>
                  <td>{data.acreFeet}</td>
                  <td>{data.inchesPerAcre}</td>
                  <td>{data.hours}</td>
                  <td>
                    <ButtonGroup>
                     {/*  <Button color="success" size="sm">Edit</Button> */}
                      <Button close className="text-danger" size="sm" onClick={() => {
                        if (window.confirm('Are you sure you want to delete this entry?')) {
                          api.deleteMeterById(data._id); 
                        }
                        window.location.reload()}
                        }/>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  )
}

export default DBTable