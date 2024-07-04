import React, {useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CreateGroupForm = ({group, members, onSave}) => {
    const {register, handleSubmit, setValue, reset} = useForm({
        defaultValues: {
            name: '',
            description: '',
            members: '',
            punishment: ''
        }
    })
}