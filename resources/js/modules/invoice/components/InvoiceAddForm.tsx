import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { number, object, string } from "yup";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";
import {
    useCreateCustomerMutation,
    useGetAllCustomersQuery,
    useUpdateCustomerMutation,
} from "../../../store/apis/customerApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppRoutesEnum } from "../../../enums/routeEnums";
import SelectInput from "../../../components/form/select-input";
import DateInput from "../../../components/form/date-input";
import { useGetAllVendorsQuery } from "../../../store/apis/vendorApi";
import { useCreateInvoiceMutation } from "../../../store/apis/invoiceApi";
type Props = { editData?: any | null; onSuccess?: (result: any) => void };
const initialValues = {
    invoice_issue_date: "",
    bill_issue_date: "",
    invoice_due_date: "",
    bill_due_date: "",
    destination: "",
    master_air_way_bill: "",
    master_air_way_bill_fee: 0,
    unit: 0,
    cartoon_amount: 0,
    gross_weight: 0,
    chargeable_weight: 0,
    kg: 0,
    invoice_rate: 0,
    bill_rate: 0,
    bill_thc: 0,
    bill_ssc: 0,
    bill_cd: 0,
    bill_cgc: 0,
    bill_ams: 0,
    bill_itt: 0,
    bill_total_usd: 0,
    bill_ait: 0,
    bill_vat: 0,
    bill_exchange_rate: 0,
    bill_payable_bdt: 0,
    bill_paid_amount: 0,
    bill_notes: "",
    invoice_cgc: 0,
    invoice_dtc: 0,
    invoice_ait: 0,
    invoice_vat: 0,
    others: 0,
    invoice_total_usd: 0,
    invoice_exchange_rate: 0,
    invoice_receivable_amount_bdt: 0,
    invoice_received_amount: 0,
    invoice_notes: "",
    customer_id: null,
    vendor_id: null,
};

const validationSchema = object().shape({
    invoice_issue_date: string().required("Issue Date is required"),
    bill_issue_date: string().required("Bill Date is required"),
    invoice_due_date: string().required("Due Date is required"),
    bill_due_date: string().required("Due Date is required"),
    destination: string().required("Description is required"),
    master_air_way_bill: string().required("MAWB is required"),
    master_air_way_bill_fee: number().required("MAWB Fee is required"),
    unit: number().required("Unit is required"),
    cartoon_amount: number().required("Cartoon Amount is required"),
    gross_weight: number().required("Gross Weight is required"),
    chargeable_weight: number().required("Chargeable Weight is required"),
    kg: number().required("Kg is required"),
    invoice_rate: number().required("Invoice Rate is required"),
    bill_rate: number().required("Bill Rate is required"),
    bill_thc: number().required("Bill THC is required"),
    bill_ssc: number().required("Bill SSC is required"),
    bill_cd: number().required("Bill CD is required"),
    bill_cgc: number().required("Bill CGC is required"),
    bill_ams: number().required("Bill AMS is required"),
    bill_itt: number().required("Bill ITT is required"),
    bill_total_usd: number().required("Bill Total USD is required"),
    bill_ait: number().required("Bill AIT is required"),
    bill_vat: number().required("Bill VAT is required"),
    bill_exchange_rate: number().required("Bill Exchange Rate is required"),
    bill_payable_bdt: number().required("Bill Payable BDT is required"),
    bill_paid_amount: number().required("Bill Paid Amount is required"),
    bill_notes: string().required("Bill Notes is required"),
    invoice_cgc: number().required("Invoice CGC is required"),
    invoice_dtc: number().required("Invoice DTC is required"),
    invoice_ait: number().required("Invoice AIT is required"),
    invoice_vat: number().required("Invoice VAT is required"),
    others: number().required("Others is required"),
    invoice_total_usd: number().required("Invoice Total USD is required"),
    invoice_exchange_rate: number().required(
        "Invoice Exchange Rate is required"
    ),
    invoice_receivable_amount_bdt: number().required(
        "Invoice Receivable Amount BDT is required"
    ),
    invoice_received_amount: number().required(
        "Invoice Receivable Amount is required"
    ),

    invoice_notes: string().required("Invoice Notes is required"),
    customer_id: number().required("Select a Customer"),
    vendor_id: number().required("Select a Vendor"),
});
const InvoiceAddForm: FC<Props> = ({ editData, onSuccess }) => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);
    const { data: allCustomers, isLoading: customersLoading } =
        useGetAllCustomersQuery();
    const { data: allVendors, isLoading: vendorsLoading } =
        useGetAllVendorsQuery();

    const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
    // const [updateCustomer, { isLoading: updating }] =
    //     useUpdateCustomerMutation();
    const handleSubmit = (values: any) => {
        const submitData = {
            ...values,
            master_air_way_bill_fee: Number(values.master_air_way_bill_fee),
            invoice_exchange_rate: Number(values.invoice_exchange_rate),
            cartoon_amount: Number(values.cartoon_amount),
            gross_weight: Number(values.gross_weight),
            chargeable_weight: Number(values.chargeable_weight),
            unit: Number(values.unit),
            kg: Number(values.kg),
            invoice_rate: Number(values.invoice_rate),
            bill_rate: Number(values.bill_rate),
            invoice_cgc: Number(values.invoice_cgc),
            bill_cgc: Number(values.bill_cgc),
            invoice_ait: Number(values.invoice_ait),
            bill_ait: Number(values.bill_ait),
            invoice_vat: Number(values.invoice_vat),
            bill_vat: Number(values.bill_vat),
            invoice_dtc: Number(values.invoice_dtc),
            others: Number(values.others),
            invoice_total_usd:
                Number(values.chargeable_weight) * Number(values.invoice_rate) +
                Number(values.invoice_cgc) +
                Number(values.invoice_ait) +
                Number(values.invoice_vat) +
                Number(values.invoice_dtc) +
                Number(values.others) +
                Number(values.master_air_way_bill_fee),
            invoice_receivable_amount_bdt:
                (Number(values.chargeable_weight) *
                    Number(values.invoice_rate) +
                    Number(values.invoice_cgc) +
                    Number(values.invoice_ait) +
                    Number(values.invoice_vat) +
                    Number(values.invoice_dtc) +
                    Number(values.others) +
                    Number(values.master_air_way_bill_fee)) *
                Number(values.invoice_exchange_rate),
            invoice_received_amount: Number(values.invoice_received_amount),
            bill_thc: Number(values.bill_thc),
            bill_ssc: Number(values.bill_ssc),
            bill_cd: Number(values.bill_cd),
            bill_ams: Number(values.bill_ams),
            bill_itt: Number(values.bill_itt),
            bill_total_usd:
                Number(values.chargeable_weight) * Number(values.bill_rate) +
                Number(values.bill_cgc) +
                Number(values.bill_ait) +
                Number(values.bill_vat) +
                Number(values.bill_thc) +
                Number(values.bill_ssc) +
                Number(values.bill_cd) +
                Number(values.bill_ams) +
                Number(values.bill_itt) +
                Number(values.master_air_way_bill_fee),
            bill_exchange_rate: Number(values.bill_exchange_rate),
            bill_payable_bdt:
                (Number(values.chargeable_weight) * Number(values.bill_rate) +
                    Number(values.bill_cgc) +
                    Number(values.bill_ait) +
                    Number(values.bill_vat) +
                    Number(values.bill_thc) +
                    Number(values.bill_ssc) +
                    Number(values.bill_cd) +
                    Number(values.bill_ams) +
                    Number(values.bill_itt) +
                    Number(values.master_air_way_bill_fee)) *
                Number(values.bill_exchange_rate),
            bill_paid_amount: Number(values.bill_paid_amount),
        };

        if (editData) {
            // updateCustomer({ id: values.id, body: values }).then((res: any) => {
            //     console.log(res);
            //     toast.success("Updated Successfully");
            //     navigate(AppRoutesEnum.CUSTOMERS);
            // });
        } else {
            createInvoice(submitData).then((res: any) => {
                console.log(res);
                toast.success("Created Successfully");
                navigate(AppRoutesEnum.INVOICE);
            });
        }
    };
    useEffect(() => {
        if (editData) {
            const formik = formikRef.current;
            formik?.setValues(editData);
        }
    }, [editData]);

    const calculateTotal = () => {
        const formik = formikRef.current;
        if (formik) {
            const chargeableWeight = formik.values.chargeable_weight;
            const rate = formik.values.invoice_rate;
            const invoice_cgc = formik.values.invoice_cgc;
            const invoice_vat = formik.values.invoice_vat;
            const invoice_dtc = formik.values.invoice_dtc;
            const others = formik.values.others;
            const totalUsd =
                Number(chargeableWeight) * Number(rate) +
                Number(invoice_cgc) +
                Number(invoice_vat) +
                Number(invoice_dtc) +
                Number(others);
            const invoice_exchange_rate = formik.values.invoice_exchange_rate;

            formik.setFieldValue("invoice_total_usd", Number(totalUsd));
            formik.setFieldValue(
                "invoice_receivable_amount_bdt",
                Number(totalUsd) * Number(invoice_exchange_rate)
            );
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            {({ values }) => {
                return (
                    <Form className="min-w-[600px] bg-gray-50 p-4 border mx-4 rounded-lg text-gray-600">
                        <div>
                            <div className="text-center text-xl font-semibold pb-4">
                                General Information
                            </div>
                            <div>
                                <TextInput
                                    name="master_air_way_bill"
                                    label="MAWB"
                                />
                                <TextInput
                                    name="destination"
                                    label="Destination"
                                />
                                <TextInput
                                    type="number"
                                    name="master_air_way_bill_fee"
                                    label="MAWB Fee"
                                />
                                <TextInput
                                    type="number"
                                    name="cartoon_amount"
                                    label="Cartoon Amount"
                                />
                                <TextInput
                                    type="number"
                                    name="gross_weight"
                                    label="Gross Weight"
                                />
                                <TextInput
                                    type="number"
                                    name="chargeable_weight"
                                    label="Chargeable Weight"
                                />
                                <TextInput
                                    type="number"
                                    name="unit"
                                    label="Unit"
                                />
                                <TextInput type="number" name="kg" label="Kg" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xl font-semibold pb-4">
                                    Invoice
                                </div>

                                <DateInput
                                    name="invoice_issue_date"
                                    label="Issue Date"
                                />
                                <DateInput
                                    name="invoice_due_date"
                                    label="Due Date"
                                />

                                <TextInput
                                    type="number"
                                    name="invoice_rate"
                                    label="Invoice Rate"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_cgc"
                                    label="Invoice CGC"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_ait"
                                    label="Invoice AIT"
                                />

                                <TextInput
                                    type="number"
                                    name="invoice_vat"
                                    label="Invoice VAT"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_dtc"
                                    label="Invoice DTC"
                                />

                                <TextInput
                                    type="number"
                                    name="others"
                                    label="Others"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_total_usd"
                                    label="Invoice Total USD"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_exchange_rate"
                                    label="Invoice Exchange Rate"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_receivable_amount_bdt"
                                    label="Invoice Receivable Amount BDT"
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_received_amount"
                                    label="Invoice Received Amount"
                                />
                                <TextInput
                                    name="invoice_notes"
                                    label="Invoice Notes"
                                />
                                <SelectInput
                                    name="customer_id"
                                    label="Customer"
                                    options={
                                        allCustomers?.map((customer: any) => {
                                            return {
                                                label: customer.name,
                                                value: customer.id,
                                            };
                                        }) || []
                                    }
                                    isLoading={customersLoading}
                                />
                            </div>
                            <div>
                                <div>
                                    <div className="text-xl font-semibold pb-4">
                                        Bill
                                    </div>

                                    <DateInput
                                        name="bill_issue_date"
                                        label="Issue Date"
                                    />
                                    <DateInput
                                        name="bill_due_date"
                                        label="Due Date"
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_rate"
                                        label="Bill Rate"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_cgc"
                                        label="Bill CGC"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_ait"
                                        label="Bill AIT"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_vat"
                                        label="Bill VAT"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_thc"
                                        label="Bill THC"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_ssc"
                                        label="Bill SSC"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_cd"
                                        label="Bill CD"
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_ams"
                                        label="Bill AMS"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_itt"
                                        label="Bill ITT"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_total_usd"
                                        label="Bill Total USD"
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_exchange_rate"
                                        label="Bill Exchange Rate"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_payable_bdt"
                                        label="Bill Payable BDT"
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_paid_amount"
                                        label="Bill Paid Amount"
                                    />

                                    <TextInput
                                        name="bill_notes"
                                        label="Bill Notes"
                                    />

                                    <SelectInput
                                        name="vendor_id"
                                        label="Vendor"
                                        options={
                                            allVendors?.map((vendor: any) => {
                                                return {
                                                    label: vendor.name,
                                                    value: vendor.id,
                                                };
                                            }) || []
                                        }
                                        isLoading={vendorsLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading}
                                disabled={isLoading}
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
