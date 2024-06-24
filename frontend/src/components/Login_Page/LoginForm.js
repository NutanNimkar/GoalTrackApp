/* import React, { useState} from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formLogin">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...register("email", { required: true })}
                />
                {errors.email&& <p>This field is required</p>}
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    {...register("password", { required: true })}
                />
                {errors.password&& <p>This field is required</p>}
                </Form.Group>
                <Button variant="primary" type="submit"> Login </Button>
        </Form>

    );

};

export default LoginForm; */