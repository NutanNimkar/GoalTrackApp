import React, {useContext, useEffect} from 'react';
import { Form, Button, FormGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { GroupsPageContext } from '../Context/GroupsPageContext';
import { SharedStateContext } from '../Context/SharedStateContext';

const AddMemberToGroup = ({group, members, onSave}) => {
    const {users} = useContext(SharedStateContext)
    const {register, handleSubmit, setValue, reset} = useForm({
        defaultValues: {
            name: '',
            members: ''
        }
    });

    useEffect(() => {
        if (group) {
            setValue('name', group.name);
            setValue('members', group.members);
        }
        else {
            reset({
                name: '',
                members: ''
            });
        }
    }, [group, setValue, reset])

    const onSubmit = (data) => {
        onSave(data);
    }

    console.log(members)

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='addGroupMemberSelection'>
                <Form.Label>Select member</Form.Label>
                <Form.Control
                    as='select'
                    {...register('members', {required: true})}
                    style={{overflowY: 'auto', maxHeight: '200px'}}
                >
                        {
                            users.map((member) => (
                                <option key={member._id} value={member._id}>{member.username}</option>
                            ))
                        }
                </Form.Control>
            </Form.Group>
            <Button variant='success' type='submit'>Add Member</Button>
        </Form>
    );
}

export default AddMemberToGroup;