import React, { useState, useEffect } from 'react';
import './App.css';
import DataBase from './DB'
import { 
  Button, 
  Form, FormGroup, 
  Label, 
  Input, 
  Card,
  CardTitle,
  CardText, 
  CardBody, 
  CardHeader, 
  CardFooter, 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
  Row, 
  Col,
  Table,
  ButtonGroup 
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import classnames from 'classnames';
import api from './api'

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

function App() {
  const [activeTab, setActiveTab] = useState('1')
  /* const [meterStart, setmeterStart] = useState("")
  const [meterEnd, setmeterEnd] = useState("") */
  //const [acres, setAcres] = useState("")
  const [result, setResult] = useState(0)
  const [acreFeet, setacreFeet] = useState(0)
  const [field, setField] = useForm({
    start: "",
    timeStart: "",
    meterStart: "",
    end: "",
    timeEnd: "",
    meterEnd: "",
    acres: "",
    inchesPerAcre: "",
    acreFeet: "",
    hours: ""
  })
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)


 console.log(field)
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const calculateTotal = () => {
    if (isNaN(field.acres)) {
      setResult("")
    }
    else {
      setResult(((field.meterEnd-field.meterStart)*(12/1000))/field.acres)
      setacreFeet((field.meterEnd-field.meterStart)*(.001))
    }
  }

  /* const clearValues = () => {
    setmeterStart("")
    setmeterEnd("")
    setAcres("")
  } */

  useEffect( () => {
    setIsLoading(true)
    const fetchData = async () => {
      const result = await api.getAllMeters()
      .then(result => setData(result.data.data), setIsLoading(false))
  
    }
    fetchData()
  
  }, [])

  return (
    <div style={{minHeight: "100vh", overflow: "hidden", display: "block", position: "relative", paddingBottom: "100px"}}>
      <div className="jumbotron" style={{
        background: "linear-gradient(to bottom, #00cc00 0%, #006600 100%)",
        boxShadow: "3px 3px 2px 1px rgba(0, 0 , 0, .3)"
        }}>
        <div className="container">
           <div className="text-center">
             <h1 className="text-uppercase text-white">El Nogal Irrigation Meter</h1>
           </div>
          </div>
        </div>
        <div className="container">
          <Nav tabs>
            <NavItem>
              <NavLink 
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                El Nogal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Canal
              </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12" className="mt-4">
                <Card>
                  <CardHeader tag="h3">El Nogal Pump</CardHeader>
                    <CardBody>
                      <Form onSubmit={e => {e.preventDefault(); api.insertMeter(field); window.location.reload()}}>
                        <Row form inline>
                          <Col md={4}>
                            <FormGroup>
                            {/*   <Label for="meterStart">Meter Start</Label> */}
                              <Input placeholder="Meter Starting Value" type="number" name="meter-start" bsSize="sm" value={field.meterStart} id="meterStart" onChange={setField}/>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              {/* <Label for="meterEnd">Meter End</Label> */}
                              <Input placeholder="Meter Ending Value" type="number" name="meter-end" bsSize="sm" value={field.meterEnd} id="meterEnd" onChange={setField} />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                             {/*  <Label for="acres">Acres</Label> */}
                              <Input placeholder="Acres" type="number" name="acres" bsSize="sm" value={field.acres} id="acres" onChange={setField}/>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row form inline>
                          <Col md={3}>
                            <FormGroup >
                             {/*  <Label>Start Date</Label> */}
                              <Input placeholder="Start Date "type="date"  bsSize="sm" name="date-start" value={field.start} id="start" onChange={setField}></Input>
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                              <FormGroup>
                               {/*  <Label>Time Start</Label> */}
                                <Input type="time" placeholder="Start Time" bsSize="sm" name="time-start" value={field.timeStart} id="timeStart" onChange={setField}></Input>
                              </FormGroup>
                            </Col>
                            <Col md={3}>
                              <FormGroup >
                               {/*  <Label>End Date</Label> */}
                                <Input type="date"  bsSize="sm" name="date-end" value={field.end} id="end" onChange={setField}></Input>
                              </FormGroup>
                            </Col>
                            <Col md={3}>
                              <FormGroup>
                              {/*   <Label>Time End</Label> */}
                                <Input type="time" bsSize="sm" name="time-end" value={field.timeEnd} id="timeEnd" onChange={setField}></Input>
                              </FormGroup>
                          </Col>
                          <Button onClick={calculateTotal}>Calculate</Button>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <CardTitle tag="h3" className="mt-3">Result</CardTitle>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <Col md="6 offset-4">
                            <h4 type="number" name="inches-per-acre" value={field.inchesPerAcre} id="inchesPerAcre" onChange={setField}>{(result).toFixed(1)} {" "} inches per acre </h4>
                            <Input type="number" name="inches-per-acre" value={((field.meterEnd-field.meterStart)*(12/1000))/field.acres} id="inchesPerAcre" onChange={setField}></Input> <CardTitle> inches per acre</CardTitle>
                            <Input readOnly placeholder={(acreFeet).toFixed(1)}/> <CardTitle>acre/feet</CardTitle>
                           <h4>{(result).toFixed(1)} {" "} inches per acre </h4>
                           <h4>{(acreFeet).toFixed(1)} {" "} acre/feet</h4>
                          </Col>
                        </Row>
                        <Button type="submit" value="submit">Save</Button>
                      </Form>
                    </CardBody>
                </Card>
              </Col>
            </Row>
          {/*   <Row>
              <Col md="6" className="mt-4">
                <Card>
                <CardHeader tag="h3">El Nogal Pump</CardHeader>
                  <CardBody>
                    <Form>
                      <FormGroup>
                        <Label for="meterStart">Meter Start</Label>
                        <Input type="number" name="meter-start" value={field.meterStart} id="meterStart" onChange={setField}/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="meterEnd">Meter End</Label>
                        <Input placeholder="Meter Ending Value" type="number" name="meter-end" value={field.meterEnd} id="meterEnd" onChange={setField} />
                      </FormGroup>
                      <FormGroup>
                        <Label for="acres">Acres</Label>
                        <Input placeholder="Meter Ending Value" type="number" name="acres" value={field.acres} id="acres" onChange={setField}/>
                      </FormGroup>
                    </Form>
                      <Button onClick={calculateTotal}>Calculate</Button>{" "}
                      <Button onClick={clearValues}>Clear</Button>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" className="mt-4">
                <Card style={{
                  boxShadow: "4px 4px 2px 1px rgba(0, 0 , 0, .2)"
                }}>
                  <CardBody >
                    <h4>{(result).toFixed(2)} {" "} inches per acre </h4>
                    <h4>{(acreFeet).toFixed(1)} {" "} acre/feet</h4>
                    <hr/>
                    <Form inline onSubmit={e => {e.preventDefault(); api.insertMeter(field); window.location.reload()}}>
                     <Row form>
                       <Col md={6}>
                         <FormGroup >
                           <Label>Start Date</Label>
                           <Input type="date"  bsSize="sm" name="date-start" value={field.start} id="start" onChange={setField}></Input>
                         </FormGroup>
                       </Col>
                       <Col md={6}>
                          <FormGroup>
                            <Label>Time Start</Label>
                            <Input type="time" placeholder="sm" bsSize="sm" name="time-start" value={field.timeStart} id="timeStart" onChange={setField}></Input>
                          </FormGroup>
                         </Col>
                     </Row>
                     <Row form>
                       <Col md={6}>
                         <FormGroup >
                           <Label>End Date</Label>
                           <Input type="date"  bsSize="sm" name="date-end" value={field.end} id="end" onChange={setField}></Input>
                         </FormGroup>
                       </Col>
                       <Col md={6}>
                          <FormGroup>
                            <Label>Time End</Label>
                            <Input type="time" placeholder="sm" bsSize="sm" name="time-end" value={field.timeEnd} id="timeEnd" onChange={setField}></Input>
                          </FormGroup>
                         </Col>
                     </Row>
                     <Button className="mt-3">Save</Button>
                    </Form>
                    
                  </CardBody>
                  <CardFooter className="text-muted">Meter Reading in Acre-Feet x .001: Water Pumped, Ac-In = (Ending Meter Reading - Beginning Meter Reading) x 12/1000 - Divide by acres in field to get inches applied per acre</CardFooter>
                </Card>
              </Col>
            </Row> */}
            <Row>
            
              <Col sm="12" md={{ size: 10, offset: 1}}>
                <div className="container mt-5">
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
                          <th></th>
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
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <CanalPump/> 
          </TabPane>
        </TabContent>
      </div>
    
     
      <footer className="bg-secondary text-white" style={{bottom: "0", position: "absolute", width: "100%"}}>
        <div className="footer-copyright text-center py-3">© 2019 Copyright - {" "}
          <a href="https://mirelescloud.com"><span className="text-white">MirelesCloud</span></a>
        </div>
      </footer>
    </div>
  );
}

function CanalPump() {
  const [meterStart, setmeterStart] = useState("")
  const [meterEnd, setmeterEnd] = useState("")
  const [acres, setAcres] = useState("")
  const [result, setResult] = useState(0)
  const [acreFeet, setAcreFeet] = useState(0)
  const calculateTotal = () => {
    if (isNaN(acres)) {
      setResult("")
      
    }
    else {
      setResult(((meterEnd-meterStart)*(12/100))/acres)
      setAcreFeet((meterEnd-meterStart)*(.01))
    }
  }

  const clearValues = () => {
    setmeterStart("")
    setmeterEnd("")
    setAcres("")
  }

  let gallons = 325851

  return (
    <>
      <Row>
        <Col md="6" className="mt-4">
        <Card>
            <CardHeader tag="h3">Canal Pump</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="meterStart">Meter Start</Label>
                    <Input type="number" name="meterStart" placeholder="Meter Starting Value" value={meterStart} onChange={e => setmeterStart(e.target.value)}/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="meterEnd">Meter End</Label>
                    <Input type="number" name="meterEnd" placeholder="Meter Ending Value" value={meterEnd} onChange={e => setmeterEnd(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="acres">Acres</Label>
                    <Input type="number" name="acres" placeholder="Acres Irrigated" value={acres} onChange={e => setAcres(e.target.value)}/>
                  </FormGroup>
                  <Button onClick={calculateTotal}>Calculate</Button>{"  "}
                  <Button onClick={clearValues}>Clear</Button>
                </Form>
              </CardBody>
            </Card>
        </Col>
        <Col md="6" className="mt-4">
          <Card style={{
                boxShadow: "4px 4px 2px 1px rgba(0, 0 , 0, .2)"
              }}>
            <CardBody >
              <h4>{(result).toFixed(1)} {" "} inches per acre</h4>
              <h4>{(acreFeet).toFixed(1)} {" "} acre/feet</h4>
            </CardBody>
            <CardFooter className="text-muted">Meter Reading in Acre-Feet x .01: Water Pumped, Ac-In = (Ending Meter Reading - Beginning Meter Reading) x 12/100 - Divide by acres in field to get inches applied per acre</CardFooter>
          </Card>
        </Col>
      </Row>
    </>
  );
}


export default App;
