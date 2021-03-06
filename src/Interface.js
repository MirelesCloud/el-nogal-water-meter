import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Form, FormGroup, 
  Label, 
  Input, 
  CardTitle,
  CardBody, 
  Row, 
  Col,
} from 'reactstrap';
import api from './api'

const Interface = (props) => {
  const [result, setResult] = useState([])
  const useForm = props.data.useForm
  const [field, setField] = useForm(props.data.field)
  
  let { start, end, startDate, endDate, startTime, endTime, acres,  inchesPerAcre, acreFeet, hours} = field
  let calculate = props.calculate

console.log(props)
 const click = () => {
    calculate(start, end, acres, startDate, endDate, startTime, endTime)
 }

  useEffect(() => {
    field.inchesPerAcre = props.result[0]
    field.acreFeet = props.result[1]
    field.hours = props.result[2] || null
   setResult(field.inchesPerAcre, field.acreFeet, field.hours)
 })

 const handleSubmit = e => {
  e.preventDefault()
  api.insertMeter(field)
  window.location.reload()
}

  return (
    <CardBody>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={4}>
            <FormGroup>
            {/*   <Label for="meterStart">Meter Start</Label> */}
              <Input placeholder="Meter Starting Value" type="number" name="meter-start" bsSize="sm" value={start} id="start" onChange={setField}/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              {/* <Label for="meterEnd">Meter End</Label> */}
              <Input placeholder="Meter Ending Value" type="number" name="meter-end" bsSize="sm" value={end} id="end" onChange={setField} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              {/*  <Label for="acres">Acres</Label> */}
              <Input placeholder="Acres" type="number" name="acres" bsSize="sm" value={acres} id="acres" onChange={setField}/>
            </FormGroup>
          </Col>
        </Row>
        <Row form >
          <Col md={3}>
            <FormGroup >
              {/*  <Label>Start Date</Label> */}
              <Input placeholder="Start Date "type="date"  bsSize="sm" name="date-start" value={startDate} id="startDate" onChange={setField}></Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              {/*  <Label>Time Start</Label> */}
              <Input type="time" placeholder="Start Time" bsSize="sm" name="time-start" value={startTime} id="startTime" onChange={setField}></Input>
            </FormGroup>
          </Col>
            <Col md={3}>
            <FormGroup >
              {/*  <Label>End Date</Label> */}
              <Input type="date"  bsSize="sm" name="date-end" value={endDate} id="endDate" onChange={setField}></Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
            {/*   <Label>Time End</Label> */}
              <Input type="time" bsSize="sm" name="time-end" value={endTime} id="endTime" onChange={setField}></Input>
            </FormGroup>
          </Col>
          <Button onClick={click}>Calculate</Button>
        </Row>
        <Row>
          <Col md={12}>
            <CardTitle tag="h3" className="mt-3">Result</CardTitle>
          </Col>
        </Row>
        <hr/>
        <Row form >
          <Col md="3 offset-1">
            <FormGroup>
              <Label>Acre/Feet</Label>
              {/* <Input readOnly type="number" name="acre-feet" value={field.acreFeet} id="acreFeet" onSubmit={setField}/> */}
              <div className="result" type="number" name="acre-feet" value={acreFeet} id="acreFeet" onSubmit={setField}>{acreFeet}</div>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Inches Per Acre</Label>
              {/* <Input readOnly type="number" name="inches-per-acre" value={field.inchesPerAcre} id="inchesPerAcre" onSubmit={setField}/>  */}
              <div className="result" type="number" name="inches-per-acre" value={inchesPerAcre} id="inchesPerAcre" onSubmit={setField}>{inchesPerAcre}</div>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label>Hours Irrigated</Label> 
              {/* <Input readOnly type="number" name="hours" value={field.hours} id="hours" onSubmit={setField}/>  */}
              <div className="result" type="number" name="hours" value={hours} id="hours" onSubmit={setField}>{hours}</div>
            </FormGroup>
          </Col>
        </Row>
      <Button type="submit" value="submit">Save</Button>
    </Form>
  </CardBody>
  )
}

export default Interface