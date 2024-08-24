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
    issue_date: "",
    destination: "",
    master_air_way_bill: "",
    master_air_way_bill_fee: 0,
    unit: 0,
    cartoon_amount: 0,
    gross_weight: 0,
    chargeable_weight: 0,
    kg: 0,
    invoice_due_date: "",
    bill_due_date: "",
    invoice_rate: 0,
    bill_rate: 0,
    thc: 0,
    ssc: 0,
    cd: 0,
    cgc: 0,
    dtc: 0,
    ait: 0,
    ams: 0,
    itt: 0,
    others: 0,
    exchange_rate: 0,
    invoice_vat: 0,
    bill_vat: 0,
    invoice_total_usd: 0,
    invoice_receivable_amount_bdt: 0,
    invoice_received_amount: 0,
    bill_total_usd: 0,
    invoice_note: "",
    customer_id: null,
    bill_payable_bdt: 0,
    bill_paid_amount: 0,
    bill_note: "",
    vendor_id: null,

    // invoice_payment_method: "",
    // invoice_transaction_note: "",
    // bill_payment_method: "",
    // bill_transaction_note: "",
    // bill_chart_of_account_id: null,
    // invoice_chart_of_account_id: null,
};

const validationSchema = object().shape({
    issue_date: string().required("Issue Date is required"),
    destination: string().required("Description is required"),
    master_air_way_bill: string().required("MAWB is required"),
    master_air_way_bill_fee: number().required("MAWB Fee is required"),
    unit: number().required("Unit is required"),
    cartoon_amount: number().required("Cartoon Amount is required"),
    gross_weight: number().required("Gross Weight is required"),
    chargeable_weight: number().required("Chargeable Weight is required"),
    kg: number().required("Kg is required"),
    invoice_due_date: string().required("Due Date is required"),
    bill_due_date: string().required("Due Date is required"),
    invoice_rate: number().required("Invoice Rate is required"),
    bill_rate: number().required("Bill Rate is required"),
    thc: number().required("THC is required"),
    ssc: number().required("SSC is required"),
    cd: number().required("CD is required"),
    cgc: number().required("CGC is required"),
    dtc: number().required("DTC is required"),
    ait: number().required("AIT is required"),
    ams: number().required("AMS is required"),
    itt: number().required("IIT is required"),
    others: number().required("Others is required"),
    exchange_rate: number().required("Exchange Rate is required"),
    invoice_vat: number().required("Invoice VAT is required"),
    bill_vat: number().required("Bill VAT is required"),
    invoice_total_usd: number().required("Invoice Total USD is required"),
    invoice_receivable_amount_bdt: number().required(
        "Invoice Receivable Amount BDT is required"
    ),
    invoice_received_amount: number().required(
        "Invoice Receivable Amount is required"
    ),
    bill_total_usd: number().required("Bill Total USD is required"),
    invoice_note: string().required("Invoice Notes is required"),
    customer_id: number().required("Select a Customer"),
    bill_payable_bdt: number().required("Bill Payable BDT is required"),
    bill_paid_amount: number().required("Bill Paid Amount is required"),
    bill_note: string().required("Bill Notes is required"),
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
            chargeable_weight: Number(values.chargeable_weight),
            invoice_rate: Number(values.invoice_rate),
            bill_rate: Number(values.bill_rate),
            exchange_rate: Number(values.exchange_rate),
            cartoon_amount: Number(values.cartoon_amount),
            gross_weight: Number(values.gross_weight),
            unit: Number(values.unit),
            kg: Number(values.kg),

            thc: Number(values.thc),
            ssc: Number(values.ssc),
            cd: Number(values.cd),
            cgc: Number(values.cgc),
            dtc: Number(values.dtc),
            ait: Number(values.ait),
            ams: Number(values.ams),
            itt: Number(values.itt),
            others: Number(values.others),

            invoice_vat: Number(values.invoice_vat),
            bill_vat: Number(values.bill_vat),

            invoice_total_usd:
                Number(values.chargeable_weight) * Number(values.invoice_rate) +
                Number(values.thc) +
                Number(values.ssc) +
                Number(values.cd) +
                Number(values.cgc) +
                Number(values.dtc) +
                Number(values.ait) +
                Number(values.ams) +
                Number(values.itt) +
                Number(values.others) +
                Number(values.invoice_vat) +
                Number(values.master_air_way_bill_fee),

            invoice_receivable_amount_bdt:
                (Number(values.chargeable_weight) *
                    Number(values.invoice_rate) +
                    Number(values.thc) +
                    Number(values.ssc) +
                    Number(values.cd) +
                    Number(values.cgc) +
                    Number(values.dtc) +
                    Number(values.ait) +
                    Number(values.ams) +
                    Number(values.itt) +
                    Number(values.others) +
                    Number(values.invoice_vat) +
                    Number(values.master_air_way_bill_fee)) *
                Number(values.exchange_rate),

            invoice_received_amount: Number(values.invoice_received_amount),

            bill_total_usd:
                Number(values.chargeable_weight) * Number(values.bill_rate) +
                Number(values.thc) +
                Number(values.ssc) +
                Number(values.cd) +
                Number(values.cgc) +
                Number(values.dtc) +
                Number(values.ait) +
                Number(values.ams) +
                Number(values.itt) +
                Number(values.others) +
                Number(values.bill_vat) +
                Number(values.master_air_way_bill_fee),

            bill_payable_bdt:
                (Number(values.chargeable_weight) * Number(values.bill_rate) +
                    Number(values.thc) +
                    Number(values.ssc) +
                    Number(values.cd) +
                    Number(values.cgc) +
                    Number(values.dtc) +
                    Number(values.ait) +
                    Number(values.ams) +
                    Number(values.itt) +
                    Number(values.others) +
                    Number(values.bill_vat) +
                    Number(values.master_air_way_bill_fee)) *
                Number(values.exchange_rate),

            bill_paid_amount: Number(values.bill_paid_amount),
        };

        if (editData) {
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

    const calculateTotal = (e: any) => {
        const { name } = e.target;
        const value = e.target.value === "" ? 0 : e.target.value;

        const formik = formikRef.current;

        if (value === 0) {
            formik?.setFieldValue(name, 0);
        }

        if (formik) {
            const updatedValues = {
                ...formik.values,
                [name]: isNaN(value) ? 0 : Number(value),
            };

            const {
                master_air_way_bill_fee,
                chargeable_weight,
                invoice_rate,
                bill_rate,
                thc,
                ssc,
                cd,
                cgc,
                dtc,
                ait,
                ams,
                itt,
                others,
                exchange_rate,
                invoice_vat,
                bill_vat,
            } = updatedValues;

            const total =
                Number(master_air_way_bill_fee) +
                Number(thc) +
                Number(ssc) +
                Number(cd) +
                Number(cgc) +
                Number(dtc) +
                Number(ait) +
                Number(ams) +
                Number(itt) +
                Number(others);

            const invoiceTotal =
                total +
                Number(invoice_vat) +
                Number(chargeable_weight) * Number(invoice_rate);
            const billTotal =
                total +
                Number(bill_vat) +
                Number(chargeable_weight) * Number(bill_rate);

            formik.setFieldValue("invoice_total_usd", invoiceTotal);
            formik.setFieldValue(
                "invoice_receivable_amount_bdt",
                Number(invoiceTotal) * Number(exchange_rate)
            );
            formik.setFieldValue("bill_total_usd", billTotal);
            formik.setFieldValue(
                "bill_payable_bdt",
                Number(billTotal) * Number(exchange_rate)
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
            {() => {
                return (
                    <Form className="min-w-[600px] bg-gray-50 p-4 border mx-4 rounded-lg text-gray-600">
                        <div>
                            <div className="text-center text-xl font-semibold pb-4">
                                General Information
                            </div>
                            <div>
                                <DateInput
                                    name="issue_date"
                                    label="Issue Date"
                                />
                                <TextInput
                                    name="destination"
                                    label="Destination"
                                />
                                <TextInput
                                    name="master_air_way_bill"
                                    label="MAWB"
                                />
                                <TextInput
                                    type="number"
                                    name="master_air_way_bill_fee"
                                    label="MAWB Fee"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="unit"
                                    label="Unit"
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
                                    onChange={calculateTotal}
                                />
                                <TextInput type="number" name="kg" label="Kg" />

                                <TextInput
                                    type="number"
                                    name="thc"
                                    label="THC"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="ssc"
                                    label="SSC"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="cd"
                                    label="CD"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="cgc"
                                    label="CGC"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="dtc"
                                    label="DTC"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="ait"
                                    label="AIT"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="ams"
                                    label="AMS"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="itt"
                                    label="ITT"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="others"
                                    label="Others"
                                    onChange={calculateTotal}
                                />
                                <TextInput
                                    type="number"
                                    name="exchange_rate"
                                    label="Exchange Rate"
                                    onChange={calculateTotal}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xl font-semibold pb-4">
                                    Invoice
                                </div>

                                <DateInput
                                    name="invoice_due_date"
                                    label="Due Date"
                                />

                                <TextInput
                                    type="number"
                                    name="invoice_rate"
                                    label="Invoice Rate"
                                    onChange={calculateTotal}
                                />

                                <TextInput
                                    type="number"
                                    name="invoice_vat"
                                    label="Invoice VAT"
                                    onChange={calculateTotal}
                                />

                                <TextInput
                                    type="number"
                                    name="invoice_total_usd"
                                    label="Invoice Total USD"
                                    disabled
                                />

                                <TextInput
                                    type="number"
                                    name="invoice_receivable_amount_bdt"
                                    label="Invoice Receivable Amount BDT"
                                    disabled
                                />
                                <TextInput
                                    type="number"
                                    name="invoice_received_amount"
                                    label="Invoice Received Amount"
                                />
                                <TextInput
                                    name="invoice_note"
                                    label="Invoice Note"
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
                                        name="bill_due_date"
                                        label="Due Date"
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_rate"
                                        label="Bill Rate"
                                        onChange={calculateTotal}
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_vat"
                                        label="Bill VAT"
                                        onChange={calculateTotal}
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_total_usd"
                                        label="Bill Total USD"
                                        disabled
                                    />

                                    <TextInput
                                        type="number"
                                        name="bill_payable_bdt"
                                        label="Bill Payable BDT"
                                        disabled
                                    />
                                    <TextInput
                                        type="number"
                                        name="bill_paid_amount"
                                        label="Bill Paid Amount"
                                    />

                                    <TextInput
                                        name="bill_note"
                                        label="Bill Note"
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
