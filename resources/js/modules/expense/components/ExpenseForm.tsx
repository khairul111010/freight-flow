import { Form, Formik, FormikProps } from "formik";
import React, { FC, useRef } from "react";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";
import { number, object, string } from "yup";
import DateInput from "../../../components/form/date-input";
import SelectInput from "../../../components/form/select-input";
import { useGetAllBankAccountsQuery } from "../../../store/apis/bankApi";
import { useCreateExpenseMutation } from "../../../store/apis/expenseApi";
import toast from "react-hot-toast";
const initialValues = {
    amount: 0,
    expense_date: "",
    description: "",
    expense_note: "",
    payment_method: "",
    bank_account_id: null,
};

const validationSchema = object().shape({
    expense_date: string().required("Date is required."),
    amount: number().required("Amount is required."),
    description: string().required("Description is required."),
    payment_method: string()
        .oneOf(["cash", "bank"])
        .required("Payment method is required."),
    bank_account_id: number().when("payment_method", {
        is: "bank",
        then: (schema) => schema.required("Bank is required."),
        otherwise: (schema) => schema.nullable().notRequired(),
    }),
    expense_note: string().required("Note is required."),
});
type Props = {
    onSuccess: () => any;
};
const ExpenseForm: FC<Props> = ({ onSuccess }) => {
    const [createExpense, { isLoading }] = useCreateExpenseMutation();
    const { data: banks, isLoading: banksLoading } =
        useGetAllBankAccountsQuery();
    const formikRef = useRef<FormikProps<any>>(null);
    const handleSubmit = (values: any) => {
        const _val = { ...values, amount: Number(values.amount) };
        createExpense(_val).then(() => {
            toast.success("Expense added successfully");
            onSuccess && onSuccess();
        });
    };

    const handlePaymentMethod = (e: any) => {
        const formik = formikRef.current;
        if (e.value === "cash") {
            formik?.setFieldValue("bank_account_id", null);
        }
    };
    const handleBank = (e: any) => {
        const formik = formikRef.current;
        if (formik?.values.payment_method === "cash") {
            formik?.setFieldValue("bank_account_id", null);
        }
    };
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
                        <DateInput name="expense_date" label="Date" />
                        <TextInput name="description" label="Description" />
                        <TextInput name="amount" label="Amount" />
                        <SelectInput
                            name="payment_method"
                            label="Payment method"
                            options={[
                                { value: "cash", label: "Cash" },
                                { value: "bank", label: "Bank" },
                            ]}
                            onChange={handlePaymentMethod}
                        />
                        <SelectInput
                            name="bank_account_id"
                            label="Bank"
                            isLoading={banksLoading}
                            options={
                                banks?.map((bank: any) => {
                                    return {
                                        value: bank.id,
                                        label: `${bank.account_name} - ${bank.account_number}`,
                                    };
                                }) || []
                            }
                            onChange={handleBank}
                        />
                        <TextInput name="expense_note" label="Note" />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                type="submit"
                                className="rounded-md"
                            >
                                Add Expense
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ExpenseForm;
