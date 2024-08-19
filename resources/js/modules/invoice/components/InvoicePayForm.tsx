import { Form, Formik, FormikProps } from "formik";
import { FC, useRef } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { number, object, string } from "yup";
import Button from "../../../components/button";
import SelectInput from "../../../components/form/select-input";
import TextInput from "../../../components/form/text-input";
import { useGetAllBankAccountsQuery } from "../../../store/apis/bankApi";
import { useUpdateInvoiceMutation } from "../../../store/apis/invoiceApi";
const initialValues = {
    invoice_received_amount: "",
    invoice_payment_method: "",
    invoice_bank_account_id: null,
    invoice_transaction_note: "",
};

const validationSchema = object().shape({
    invoice_received_amount: string().required("Received Amount is required."),
    invoice_transaction_note: string().required("Note is required."),
    invoice_payment_method: string()
        .oneOf(["cash", "bank"])
        .required("Payment method is required."),
    invoice_bank_account_id: number().when("invoice_payment_method", {
        is: "bank",
        then: (schema) => schema.required("Bank is required."),
        otherwise: (schema) => schema.nullable().notRequired(),
    }),
});

type Props = {
    onSuccess: () => any;
};

const InvoicePayForm: FC<Props> = ({ onSuccess }) => {
    const { id } = useParams();
    const formikRef = useRef<FormikProps<any>>(null);
    const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation();

    const { data: banks, isLoading: banksLoading } =
        useGetAllBankAccountsQuery();

    const handleSubmit = (values: any) => {
        const val = {
            ...values,
            invoice_received_amount: Number(values.invoice_received_amount),
        };
        updateInvoice({ id, ...val }).then(() => {
            toast.success("Paid Successfully");
            onSuccess && onSuccess();
        });
    };

    const handlePaymentMethod = (e: any) => {
        const formik = formikRef.current;
        if (e.value === "cash") {
            formik?.setFieldValue("invoice_bank_account_id", null);
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
                            name="invoice_received_amount"
                            label="Received Amount"
                        />

                        <SelectInput
                            name="invoice_payment_method"
                            label="Payment method"
                            options={[
                                { value: "cash", label: "Cash" },
                                { value: "bank", label: "Bank" },
                            ]}
                            onChange={handlePaymentMethod}
                        />
                        <SelectInput
                            name="invoice_bank_account_id"
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
                        />

                        <TextInput
                            name="invoice_transaction_note"
                            label="Note"
                        />

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

export default InvoicePayForm;
