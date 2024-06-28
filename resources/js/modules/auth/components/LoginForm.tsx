import React from "react";

import { Form, Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useLoginMutation } from "../../../store/apis/authApi";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = object().shape({
    email: string()
        .required("Email is required.")
        .email("Please enter a valid email address."),
    password: string()
        .required("Password is required.")
        .min(8, "Password must be 8 characters."),
});

const LoginForm: FC = () => {
    const formikRef = useRef<FormikProps<any>>(null);
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (values: any) => {
        login(values)
            .unwrap()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                if (error.data) {
                    formikRef.current?.setErrors(error.data);
                }
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            <Form>
                <TextInput
                    label="Email"
                    name="email"
                    placeholder="Enter your email address"
                    autoComplete="username"
                />
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                />
                <Button
                    className="w-full"
                    variant="primary"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Sign In
                </Button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
