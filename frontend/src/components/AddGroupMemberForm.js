import React, {useContext, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { SharedStateContext } from '../Context/SharedStateContext';

const AddMemberToGroup = ({group, onSave}) => {
    const {users} = useContext(SharedStateContext)
    const {register, handleSubmit, setValue, reset} = useForm({
        defaultValues: {
            members: '',
            task: ''
        }
    });

    useEffect(() => {
        if (group) {
            setValue('members', group.members);
            setValue('task', group.task)
        }
        else {
            reset({
                members: '',
                task: ''
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
                    style={{overflowY: 'auto', maxHeight: '200px'}}
                >
                        {
                            users.map((member) => (
                                <option key={member._id} value={member._id}>{member.username}</option>
                            ))
                        }
                </Form.Control>
            </Form.Group>
            {/* <Form.Group controlId='addGroupMemberTask'>
                <Form.Label>Add Task for member</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Give this member a task, he cannot be lazy :)'
                    {...register('task')}
                >

                </Form.Control>
            </Form.Group> */}
            <br/>
            <Button variant='success' type='submit'>Add Member</Button>
        </Form>
    );
}

export default AddMemberToGroup;