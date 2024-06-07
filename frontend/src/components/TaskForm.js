import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './TaskForm.css';

const TaskForm = ({ task, users, onSave }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      dueDate: '',
      assignedTo: ''
    }
  });

  useEffect(() => {
    if (task) {
      setValue('name', task.name);
      setValue('description', task.description);
      setValue('dueDate', task.dueDate);
      setValue('assignedTo', task.assignedTo);
    } else {
      reset({
        name: '',
        description: '',
        dueDate: '',
        assignedTo: ''
      });
    }
  }, [task, setValue, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };
  
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formTaskName">
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task name"
          {...register('name', { required: true })}
        />
      </Form.Group>
      <Form.Group controlId="formTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          {...register('description')}
        />
      </Form.Group>
      <Form.Group controlId="formTaskDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          {...register('dueDate')}
        />
      </Form.Group>
      <Form.Group controlId="formTaskAssignedTo">
        <Form.Label>Assign To</Form.Label>
        <Form.Control
          as="select"
          {...register('assignedTo', { required: true })}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default TaskForm;
