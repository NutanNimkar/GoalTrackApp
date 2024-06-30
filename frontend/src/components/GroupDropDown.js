import { Accordion } from "react-bootstrap";
import React, {useContext} from 'react'
import { SharedStateContext } from "../Context/SharedStateContext";

function GroupDropDown(){
    const {groups, groupMembers} = useContext(SharedStateContext);

    return(
        <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{groups}</Accordion.Header>
                    <Accordion.Body>
                        {groupMembers.map((member, index) => (
                            <ul key={index}>{member?.username}</ul>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
        
    )
}

export default GroupDropDown