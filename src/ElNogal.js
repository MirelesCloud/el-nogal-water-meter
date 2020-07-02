import React, { useState } from 'react'
import WellTable from './tables/WellTable'
import Interface from './Interface'
import { 
  Card,
  CardHeader, 
  Row, 
  Col,
} from 'reactstrap';


const ElNogal = ( props ) => {
  const [result, setResult] = useState([])
  const useForm = props.useForm
  const [field, setField] = useForm(props.field)
  console.log(props)
  

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
    
    const hours = hoursResult(dt1,dt2)
    
    setResult([
      inchesPerAcre,
      acreFeet,
      hours
    ])
    return result
  }

  console.log("result", result)

  const handleSubmit = e => {
    e.preventDefault()
    props.api.insertMeter(field)
    window.location.reload()
  }

  return (
  <>
    <Row>
     <Col md="12" className="mt-4">
      <Card>
        <CardHeader tag="h3">El Nogal Pump</CardHeader>
        <Interface data={props} calculate={calculate} result={result} handleSubmit={handleSubmit} />
      </Card>
     </Col>
   </Row>
   <WellTable  data={props.data} api={props.api} props={props} />
  </>
  )
}

export default ElNogal