import { Accordion, Button} from "react-bootstrap";
import React from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";

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
                                            <Button key={member} variant="light" size="lg">{member}</Button>
                                            <br/>
                                        </div>
                                        
                                    )
                                )
                                
                            }
                            <div className="d-grid gap-2">
                                <Button variant="secondary" size="lg">
                                    <AiOutlinePlusCircle style={{display: 'inline-flex', alignItems: 'center', marginRight: 50 }}/>
                                </Button>
                            </div>
                            
                        </div>
                        
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
        
    )
}

export default GroupDropDown