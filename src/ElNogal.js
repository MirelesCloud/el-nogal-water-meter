import React, { useState } from 'react'
import DBTable from './DBTable'
import Interface from './Interface'
import { 
  Card,
  CardHeader, 
  Row, 
  Col,
} from 'reactstrap';


const ElNogal = ( props ) => {
  const [result, setResult] = useState([])
  //let { inchesPerAcre, acreFeet, hours } = props.field

  const calculateTotal = ( meterEnd, meterStart, acres, start, end, timeStart, timeEnd ) => {
    const inchesPerAcre = (((meterEnd-meterStart)*(12/1000))/acres).toFixed(1);
    const acreFeet = ((meterEnd-meterStart)*(.001)).toFixed(1)
    let dt1 = new Date(start + " " + timeStart);
    let dt2 = new Date(end + " " + timeEnd);
    const hoursResult = (start, end) => {
      let diff = (end.getTime() - start.getTime())/1000;
      diff /=  (60 * 60);
      return Math.abs(Math.round(diff));
    }
    
    const hours = hoursResult(dt1,dt2)
    
    setResult([
      inchesPerAcre,
      acreFeet,
      hours
    ])
    console.log(inchesPerAcre)
      
    return result
  }

  return (
  <>
    <Row>
     <Col md="12" className="mt-4">
      <Card>
        <CardHeader tag="h3">El Nogal Pump</CardHeader>
        <Interface data={props} calculate={calculateTotal} result={result}/>
      </Card>
     </Col>
   </Row>
   <DBTable  data={props.data} api={props.api} props={props}/>
  </>
  )
}

export default ElNogal