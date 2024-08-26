import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { number, object, string } from "yup";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";
import { useCreateDiscountInvoiceMutation } from "../../../store/apis/invoiceApi";
import toast from "react-hot-toast";

const initialValues = {
    invoiceId: null,
    invoice_discounted_amount: 0,
};

const validationSchema = object().shape({
    invoice_discounted_amount: number().required(
        "Discount Amount is required."
    ),
    invoiceId: number().required(),
});

type Props = {
    id: number | string;
    onSuccess: () => any;
};
const DiscountForm: FC<Props> = ({ id, onSuccess }) => {
    const formikRef = useRef<FormikProps<any>>(null);

    const [createDiscountInvoice, { isLoading }] =
        useCreateDiscountInvoiceMutation();

    const handleSubmit = (values: any) => {
        const _val = {
            ...values,
            invoice_discounted_amount: Number(values.invoice_discounted_amount),
        };
        createDiscountInvoice({
            id: _val.invoiceId,
            body: {
                invoice_discounted_amount: _val.invoice_discounted_amount,
            },
        }).then(() => {
            toast.success("Discount Added successfully");
            onSuccess && onSuccess();
        });
    };

    useEffect(() => {
        const formik = formikRef.current;
        formik?.setFieldValue("invoiceId", Number(id));
    }, [id]);

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
                        <TextInput
                            name="invoice_discounted_amount"
                            label="Discount Amount"
                        />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                type="submit"
                                className="rounded-md"
                            >
                                Discount Add
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default DiscountForm;
