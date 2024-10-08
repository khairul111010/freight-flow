import { Form, Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { number, object, string } from "yup";
import Button from "../../../components/button";
import SelectInput from "../../../components/form/select-input";
import TextInput from "../../../components/form/text-input";
import { useGetAllBankAccountsQuery } from "../../../store/apis/bankApi";
import { useUpdateBillMutation } from "../../../store/apis/invoiceApi";
const initialValues = {
    bill_paid_amount: "",
    bill_payment_method: "",
    bill_bank_account_id: null,
    bill_transaction_note: "",
};

const validationSchema = object().shape({
    bill_paid_amount: string().required("Received Amount is required."),
    bill_transaction_note: string().required("Note is required."),
    bill_payment_method: string()
        .oneOf(["cash", "bank"])
        .required("Payment method is required."),
    bill_bank_account_id: number().when("bill_payment_method", {
        is: "bank",
        then: (schema) => schema.required("Bank is required."),
        otherwise: (schema) => schema.nullable().notRequired(),
    }),
});

type Props = {
    onSuccess: () => any;
};

const BillPayForm: FC<Props> = ({ onSuccess }) => {
    const { id } = useParams();
    const formikRef = useRef<FormikProps<any>>(null);
    const [updateBill, { isLoading }] = useUpdateBillMutation();

    const { data: banks, isLoading: banksLoading } =
        useGetAllBankAccountsQuery();

    const handleSubmit = (values: any) => {
        const val = {
            ...values,
            bill_paid_amount: Number(values.bill_paid_amount),
        };
        updateBill({ id, ...val }).then(() => {
            toast.success("Paid Successfully");
            onSuccess && onSuccess();
        });
    };

    const handlePaymentMethod = (e: any) => {
        const formik = formikRef.current;
        if (e.value === "cash") {
            formik?.setFieldValue("bill_bank_account_id", null);
        }
    };

    const handleBank = (e: any) => {
        const formik = formikRef.current;
        if (formik?.values.bill_payment_method === "cash") {
            formik?.setFieldValue("bill_bank_account_id", null);
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
                        <TextInput
                            name="bill_paid_amount"
                            label="Paid Amount"
                        />

                        <SelectInput
                            name="bill_payment_method"
                            label="Payment method"
                            options={[
                                { value: "cash", label: "Cash" },
                                { value: "bank", label: "Bank" },
                            ]}
                            onChange={handlePaymentMethod}
                        />
                        <SelectInput
                            name="bill_bank_account_id"
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

                        <TextInput name="bill_transaction_note" label="Note" />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
                                type="submit"
                                className="rounded-md"
                            >
                                Pay
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BillPayForm;
