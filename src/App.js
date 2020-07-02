import React, { useState } from 'react';
import './App.css';
import ElNogal from './ElNogal'
import Canal from './Canal'
import { 
  TabContent, 
  TabPane, 
  Nav, 
  NavItem, 
  NavLink, 
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import classnames from 'classnames';

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
  const [field ] = useForm({
    start: 0,
    end: 0,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    acres: "",
    inchesPerAcre: "",
    acreFeet: "",
    hours: ""
  })

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const currentYear = new Date().getFullYear();

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
          <ElNogal  field={field} useForm={useForm}/>
          </TabPane>
          <TabPane tabId="2">
            <Canal  field={field} useForm={useForm}/>
          </TabPane>
        </TabContent>
      </div>
      <footer className="bg-secondary text-white" style={{bottom: "0", position: "absolute", width: "100%"}}>
        <div className="footer-copyright text-center py-3">© {currentYear} Copyright - {" "}
          <a href="https://mirelescloud.com"><span className="text-white">MirelesCloud</span></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
