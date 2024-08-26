import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { number, object, string } from "yup";
import TextInput from "../../../components/form/text-input";
import SelectInput from "../../../components/form/select-input";
import Button from "../../../components/button";
import { useWithdrawBankAccountMutation } from "../../../store/apis/bankApi";
import toast from "react-hot-toast";
const initialValues = {
    amount: "",
    transaction_note: "",
    bank_account_id: null,
};

const validationSchema = object().shape({
    amount: string().required("Amount is required."),
    transaction_note: string().required("Note is required."),
    bank_account_id: number().required(),
});
type Props = {
    id: number | string;
    onSuccess: () => any;
};
const WithDrawForm: FC<Props> = ({ onSuccess, id }) => {
    const [withdrawBankAccount, { isLoading }] =
        useWithdrawBankAccountMutation();
    const formikRef = useRef<FormikProps<any>>(null);

    const handleSubmit = (values: any) => {
        const _val = { ...values, amount: Number(values.amount) };
        withdrawBankAccount({
            id: _val.bank_account_id,
            body: {
                amount: _val.amount,
                transaction_note: _val.transaction_note,
            },
        }).then(() => {
            toast.success("Withdrawn successfully");
            onSuccess && onSuccess();
        });
    };

    useEffect(() => {
        const formik = formikRef.current;
        formik?.setFieldValue("bank_account_id", Number(id));
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
                        <TextInput name="amount" label="Amount" />

                        <TextInput name="transaction_note" label="Note" />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                type="submit"
                                className="rounded-md"
                            >
                                Withdraw from bank to cash
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default WithDrawForm;
