import { Accordion, Button} from "react-bootstrap";
import React, {useContext} from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GroupsPageContext } from "../Context/GroupsPageContext";
import AddGroupMemberModal from "./AddGroupMemberModal";

function GroupDropDown({groupName, memberNames}){
    
    const {handleAddMember, setShowMemberModal, showMemberModal} = useContext(GroupsPageContext);
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
                                            {console.log(groupName)}

                                            <AddGroupMemberModal
                                                show={showMemberModal}
                                                handleClose={() => setShowMemberModal(false)}
                                                handleSave={handleAddMember}
                                                group={groupName}
                                                members={memberNames}
                                            />
                                        </div>
                                        
                                        
                                    
                                    )
                                )
                                
                            }
                            <Button variant="secondary" size="lg" onClick={handleAddMember}>
                                <AiOutlinePlusCircle style={{display: 'inline-flex', alignItems: 'center', marginRight: 50 }}/>
                            </Button>
                        </div>
                        
                    </Accordion.Body>
                </Accordion.Item>
                
        </Accordion>
        
    )
}

export default GroupDropDown