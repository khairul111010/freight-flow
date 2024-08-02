import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { object, string } from "yup";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";
import {
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
} from "../../../store/apis/customerApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppRoutesEnum } from "../../../enums/routeEnums";
import SelectInput from "../../../components/form/select-input";
import DateInput from "../../../components/form/date-input";
type Props = { editData?: any | null; onSuccess?: (result: any) => void };
const initialValues = {
    invoice_issue_date: "",
    due_date: "",
    destination: "",
    master_air_way_bill: "",
    master_air_way_bill_fee: "",
    cartoon_amount: "",
    gross_weight: "",
    chargeable_weight: "",
    invoice_rate: "",
    freight_amount: "",
    invoice_thc: "",
    invoice_ssc: "",
    invoice_cd: "",
    invoice_cgc: "",
};

const validationSchema = object().shape({
    invoice_issue_date: string().required("Issue Date is required"),
    due_date: string().required("Due Date is required"),
    destination: string().required("Description is required"),
    master_air_way_bill: string().required("MAWB is required"),
    master_air_way_bill_fee: string().required("MAWB Fee is required"),
    cartoon_amount: string().required("Cartoon Amount is required"),
    gross_weight: string().required("Gross Weight is required"),
    chargeable_weight: string().required("Chargeable Weight is required"),
    invoice_rate: string().required("Invoice Rate is required"),
    freight_amount: string().required("Freight Amount is required"),
    invoice_thc: string().required("Invoice THC is required"),
    invoice_ssc: string().required("Invoice SSC is required"),
    invoice_cd: string().required("Invoice CD is required"),
    invoice_cgc: string().required("Invoice CGC is required"),
});
const InvoiceAddForm: FC<Props> = ({ editData, onSuccess }) => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);
    // const [createCustomer, { isLoading }] = useCreateCustomerMutation();
    // const [updateCustomer, { isLoading: updating }] =
    //     useUpdateCustomerMutation();
    const handleSubmit = (values: any) => {
        console.log(values);

        // if (editData) {
        //     updateCustomer({ id: values.id, body: values }).then((res: any) => {
        //         console.log(res);
        //         toast.success("Updated Successfully");
        //         navigate(AppRoutesEnum.CUSTOMERS);
        //     });
        // } else {
        //     createCustomer(values).then((res: any) => {
        //         console.log(res);
        //         toast.success("Created Successfully");
        //         navigate(AppRoutesEnum.CUSTOMERS);
        //     });
        // }
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xl font-semibold pb-4">
                                    Invoice
                                </div>

                                <DateInput
                                    name="invoice_issue_date"
                                    label="Issue Date"
                                />
                                <DateInput name="due_date" label="Due Date" />
                                <TextInput
                                    name="destination"
                                    label="Destination"
                                />
                                <TextInput
                                    name="master_air_way_bill"
                                    label="MAWB"
                                />
                                <TextInput
                                    name="master_air_way_bill_fee"
                                    label="MAWB Fee"
                                />
                                <TextInput
                                    name="cartoon_amount"
                                    label="Cartoon Amount"
                                />
                                <TextInput
                                    name="gross_weight"
                                    label="Gross Weight"
                                />
                                <TextInput
                                    name="chargeable_weight"
                                    label="Chargeable Weight"
                                />
                                <TextInput
                                    name="invoice_rate"
                                    label="Invoice Rate"
                                />
                                <TextInput
                                    name="freight_amount"
                                    label="Freight Amount"
                                />
                                <TextInput
                                    name="invoice_thc"
                                    label="Invoice THC"
                                />
                                <TextInput
                                    name="invoice_ssc"
                                    label="Invoice SSC"
                                />
                                <TextInput
                                    name="invoice_cd"
                                    label="Invoice CD"
                                />
                                <TextInput
                                    name="invoice_cgc"
                                    label="Invoice CGC"
                                />
                            </div>
                            <div>
                                <div className="text-xl font-semibold pb-4">
                                    Bill
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <Button
                                // loading={isLoading || updating}
                                // disabled={isLoading || updating}
                                type="submit"
                                className="rounded-md"
                            >
                                {editData ? `Update` : `Create`} Invoice
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default InvoiceAddForm;
