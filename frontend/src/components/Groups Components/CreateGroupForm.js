import React, {useContext, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { SharedStateContext } from '../../Context/SharedStateContext';

const CreateGroupForm = ({group, onSave}) => {
    const {users} = useContext(SharedStateContext)
    const {register, handleSubmit, setValue, reset} = useForm({
        defaultValues: {
            name: '',
            description: '',
            punishment: '',
            members : ''
        }
    });

    useEffect(() => {
        if (group) {
            setValue('name', group.name);
            setValue('description', group.description);
            setValue('members', group.members);
            setValue('punishment', group.punishment);
        }
        else {
            reset({
                name: '',
                description: '',
                members: '',
                punishment: ''
            });
        }
    }, [group, setValue, reset]);

    const onSubmit = (data) => {
        onSave(data);
    }
    
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="createFormGroupName">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter the Group Name"
                    {...register('name', {required: true})}
                />
            </Form.Group>
            <Form.Group controlId='createFormGroupDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter a group description'
                    {...register('description', {required: true})}
                />
            </Form.Group>
            <Form.Group controlId='createFormGroupMembers'>
                <Form.Label>Group Members</Form.Label>
                <Form.Control
                    as="select"
                    {...register('members', {required: true})}
                    
                >
                    <option value="">Select a member</option>
                    {users.map((member) => (
                        <option key={member._id} value={member._id}>
                            {member.username}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='createFormGroupPunishment'>
                <Form.Label>Punishment</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter a group punishment'
                    {...register('punishment', {required: true})}
                />
            </Form.Group>
            <br/>
            <Button variant='success' type="submit">
                Create Group
            </Button>
        </Form>
    );
}

export default CreateGroupForm;