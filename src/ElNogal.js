import React, { useState, useEffect } from 'react'
import api from './api'
import WellTable from './tables/WellTable'
import { 
  Card,
  CardHeader, 
  Row, 
  Col,
  Button,
  Form,
  FormGroup,
  Label, 
  Input,
  CardTitle,
  CardBody
} from 'reactstrap';


const ElNogal = ( props ) => {
  const [result, setResult] = useState([])
  const field = props.field

  const calculate = ( start, end, acres, startDate, endDate, startTime, endTime ) => {
    const inchesPerAcre = (((end-start)*(12/1000))/acres).toFixed(1);
    const acreFeet = ((end-start)*(.001)).toFixed(1)
    let dt1 = new Date(startDate + " " + startTime);
    let dt2 = new Date(endDate + " " + endTime);
    const hoursResult = (startDate, endDate) => {
      let diff = (endDate.getTime() - startDate.getTime())/1000;
      diff /=  (60 * 60);
      return Math.abs(Math.round(diff));
    }
    field.inchesPerAcre = inchesPerAcre
    const hours = hoursResult(dt1,dt2)
    
    setResult([
      inchesPerAcre,
      acreFeet,
      hours
    ])
    return result
  }

  return (
  <>
    <Row>
     <Col md="12" className="mt-4">
      <Card>
        <CardHeader tag="h3">El Nogal Pump</CardHeader>
        <FormInterface data={props} calculate={calculate} result={result}/>
      </Card>
     </Col>
   </Row>
   <WellTable  data={props.data} api={props.api} props={props} />
  </>
  )
}

const FormInterface = (props) => {
  const [result, setResult] = useState([])
  const useForm = props.data.useForm
  const [field, setField] = useForm(props.data.field)
  
  let { start, end, startDate, endDate, startTime, endTime, acres,  inchesPerAcre, acreFeet, hours} = field
  let calculate = props.calculate

  const click = () => {
      calculate(start, end, acres, startDate, endDate, startTime, endTime)
  }

    useEffect(() => {
      field.inchesPerAcre = props.result[0]
      field.acreFeet = props.result[1]
      field.hours = props.result[2] || null
    setResult(field.inchesPerAcre, field.acreFeet, field.hours)
  }, [field.inchesPerAcre, field.acreFeet, field.hours, props.result])

  console.log(result)

  /* const handleClick = (start, end) => {
    field.acreFeet = end * start
    setResult(field.acreFeet)
  }
  console.log(acreFeet, start, end) */
  

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
export default ElNogal