import { Accordion, Button} from "react-bootstrap";
import React, {useContext} from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GroupsPageContext } from "../Context/GroupsPageContext";
import AddGroupMemberModal from "./AddGroupMemberModal";

function GroupDropDown({groupName, memberNames, groups}){
    
    const {addMember, handleAddMember, setShowMemberModal, showMemberModal, selectedGroup} = useContext(GroupsPageContext);
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
                            <Button variant="secondary" size="lg" onClick={() => handleAddMember(groupName)}>
                                <AiOutlinePlusCircle style={{display: 'inline-flex', alignItems: 'center', marginRight: 50 }}/>
                            </Button>
                            
                            <AddGroupMemberModal
                                selectedGroup = {selectedGroup}
                                show={showMemberModal}
                                handleClose={() => setShowMemberModal(false)}
                                handleSave={() => addMember(selectedGroup)}
                                group={groups}
                                members={memberNames}
                            />
                        </div>
                        
                    </Accordion.Body>
                </Accordion.Item>
                
        </Accordion>
        
    )
}

export default GroupDropDown