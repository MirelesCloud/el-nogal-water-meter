import { useState, useEffect } from 'react'
import * as React from 'react'
import api from './api'
import { Row, Table, Col, Button, ButtonGroup, Form, FormGroup, Label, Input } from 'reactstrap'

const useForm = (props) => {
  const [values, setValues] = useState(props)
  return [
    values,
    function(e) {
      setValues({
        ...values,
        [e.target.id]: e.target.value
      })
    }
  ]
}


const DataBase = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [field, setField] = useForm({
    start: "",
    timeStart: 0,
    meterStart: 0,
    end: "",
    timeEnd: 0,
    meterEnd: 0
  })
 

  useEffect( () => {
    setIsLoading(true)
    const fetchData = async () => {
      const result = await api.getAllMeters()
      .then(result => setData(result.data.data), setIsLoading(false))
  
    }
    fetchData()
  
  }, [])

  

  return (
    <Col sm="12" md={{ size: 10, offset: 2}}>
      <Row>
        <Form onSubmit={e => {e.preventDefault(); api.insertMeter(field); window.location.reload()}}>
          <FormGroup>
            <Label>Date Start</Label>
            <Input type="text" name="date-start" value={field.start} id="start" onChange={setField}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Time Start</Label>
            <Input type="text" name="date-start" value={field.timeStart} id="timeStart" onChange={setField}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Meter Start</Label>
            <Input type="number" name="meter-start" value={field.meterStart} id="meterStart" onChange={setField}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Date End</Label>
            <Input type="text" name="date-end" value={field.end} id="end" onChange={setField}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Time End</Label>
            <Input type="text" name="date-start" value={field.timeEnd} id="timeEnd" onChange={setField}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Meter End</Label>
            <Input type="number" name="meter-end" value={field.meterEnd} id="meterEnd" onChange={setField}></Input>
          </FormGroup>
          <Button type="submit" value="submit">Submit</Button>
        </Form>
      </Row>
      <Table>
      <thead>
          <tr>
            <th>Start</th>
            <th></th>
            <th></th>
            <th>End</th>
            <th></th>
            <th></th>
            <th>Result</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Meter</th>
            <th>Date</th>
            <th>Time</th>
            <th>Meter</th>
            <th>Acre/Feet</th>
            <th>Inches/Acre</th>
          </tr>
        </thead>
        <tbody>
          {!!data &&
            data.map(data => (
            <tr key={data._id}>
              <td>{data.start}</td>
              <td>{data.timeStart}</td>
              <td>{data.meterStart}</td>
              <td>{data.end}</td>
              <td>{data.timeEnd}</td>
              <td>{data.meterEnd}</td>
              <td>{data.acreFeet}</td>
              <td>{data.inchesPerAcre}</td>
              <td>
                <ButtonGroup>
                  <Button color="success" size="sm">Edit</Button>
                  <Button color="danger" size="sm" onClick={() => {
                    if (window.confirm('Are you sure you want to delete this entry?')) {
                      api.deleteMeterById(data._id); 
                    }
                    window.location.reload()}
                    }>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  )
}



export default DataBase
