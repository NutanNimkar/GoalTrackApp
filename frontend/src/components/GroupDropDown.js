import { Accordion, Button} from "react-bootstrap";
import React, { useContext } from 'react'
import {GroupsPageContext, GroupsPageProvider } from '../Context/GroupsPageContext'
function GroupDropDown({groupName, memberNames, memberIndex}){
    
    // console.log(groupID)
    console.log(memberIndex, memberNames)

    return(
        <Accordion>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>{groupName.name}</Accordion.Header>                
                    <Accordion.Body>
                        {
                            memberNames.map((member, index) => (
                                <Button key={index}>{member}</Button>
                            ))
                        }
                        
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
        
    )
}

export default GroupDropDown