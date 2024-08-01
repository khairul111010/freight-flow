import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { object, string } from "yup";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppRoutesEnum } from "../../../enums/routeEnums";
import {
    useCreateBankMutation,
    useUpdateBankMutation,
} from "../../../store/apis/bankApi";

type Props = { editData?: any | null; onSuccess?: (result: any) => void };
const initialValues = {
    name: "",
};

const validationSchema = object().shape({
    name: string().required("Name is required."),
});
const BankForm: FC<Props> = ({ editData, onSuccess }) => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);
    const [createBank, { isLoading }] = useCreateBankMutation();
    const [updateBank, { isLoading: updating }] = useUpdateBankMutation();
    const handleSubmit = (values: any) => {
        if (editData) {
            updateBank({ id: values.id, body: values }).then((res: any) => {
                console.log(res);
                toast.success("Updated Successfully");
                navigate(AppRoutesEnum.BANK);
            });
        } else {
            createBank(values).then((res: any) => {
                console.log(res);
                toast.success("Created Successfully");
                navigate(AppRoutesEnum.BANK);
            });
        }
    };
    useEffect(() => {
        if (editData) {
            const formik = formikRef.current;
            formik?.setValues(editData);
        }
    }, [editData]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            {() => {
                return (
                    <Form className="min-w-[600px] bg-gray-50 p-4 border mx-4 rounded-lg text-gray-600">
                        <TextInput name="name" label="Name" />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading || updating}
                                disabled={isLoading || updating}
                                type="submit"
                                className="rounded-md"
                            >
                                {editData ? `Update` : `Add`} Bank
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BankForm;
