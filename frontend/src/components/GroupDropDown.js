import { Accordion, Button } from "react-bootstrap";
import React from 'react'

function GroupDropDown({groupName, groupID}){
    
    // console.log(groupID)
    
    return(
        <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{groupName.name}</Accordion.Header>                
                    <Accordion.Body>
                        {groupName.members.map((member, index) => (
                            <Button key={index}>{member}</Button>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
        
    )
}

export default GroupDropDown