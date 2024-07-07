import React, {useContext, useEffect} from 'react';
import { Form, Button, FormGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { GroupsPageContext } from '../Context/GroupsPageContext';

const AddMemberToGroup = ({group, members, onSave}) => {
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

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='addGroupMemberSelection'>
                <Form.Label>Select member</Form.Label>
                <Form.Control
                    as='select'
                    {...register('members', {required: true})}
                >
                    <DropdownButton
                        id='member-addtion-select'
                        variant='secondary'
                        title='Select a member'
                        data-bs-theme='dark'
                    >
                        {
                            members.map((member, index) => (
                                <Dropdown.Item key={index}>{member}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                </Form.Control>
            </Form.Group>
        </Form>
    );
}

export default AddMemberToGroup;