import { Accordion, Button} from "react-bootstrap";
import React from 'react';
// import {CIcon} from '@coreui/icons-react'
import {cisPlusCircle} from '@coreui/icons';

function GroupDropDown({groupName, memberNames}){
    
    if(!Array.isArray(memberNames)) {
        memberNames = [];
    }

    return(
        <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{groupName}</Accordion.Header>                
                    <Accordion.Body>
                        <div>
                            {
                                memberNames.map((member, index) => (
                                        <div className="d-grid gap-2" key={index}>
                                            <Button key={member} variant="light" size="lg" className="d-grid gap-2">{member}</Button>
                                            <br/>
                                        </div>
                                        
                                    )
                                )
                                
                            }
                            {/* <Button variant="secondary" size="lg" className="d-grid gap-2">
                                <CIcon icon={cisPlusCircle}/>
                            </Button> */}
                        </div>
                        
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
        
    )
}

export default GroupDropDown