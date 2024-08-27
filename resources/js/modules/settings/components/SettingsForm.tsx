import { Form, Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { mixed, number, object, string } from "yup";
import Button from "../../../components/button";
import FileInput from "../../../components/form/file-input";
import TextInput from "../../../components/form/text-input";
import {
    useGetOrganizationQuery,
    useUpdateOrganizationMutation,
} from "../../../store/apis/organizationApi";
const initialValues = {
    name: "",
    description: "",
    address: "",
    logo: null,
    currency: "",
    invoice_prefix: "",
    invoice_start_number: null,
    opening_cash_balance: 0,
};

const validationSchema = object().shape({
    name: string().required("Name is required."),
    description: string().required("Description is required."),
    address: string().required("Address is required."),
    logo: mixed()
        .test(
            "logo",
            "File size is too big. Make it less than 5MB",
            (value: any) => {
                return value.size <= 5000000;
            }
        )
        .required("Logo is required"),
    currency: string().oneOf(["BDT", "USD"]).required("Currency is required."),
    invoice_prefix: string().required("Invoice Prefix is required."),
    invoice_start_number: number().required(
        "Invoice Start Number is required."
    ),
    opening_cash_balance: number().required("Balance is required."),
});

const SettingsForm = () => {
    const formikRef = useRef<FormikProps<any>>(null);
    const [fileError, setFileError] = useState<any>("");
    const { data } = useGetOrganizationQuery();
    const [updateOrganization, { isLoading: submitting }] =
        useUpdateOrganizationMutation();

    const handleSubmit = (values: any) => {
        console.log(values);
        const formData = new FormData();
        for (const key in values) {
            formData.append(key, values[key]);
        }
        updateOrganization({ id: data.id, body: formData }).then((res: any) => {
            console.log(res);
            toast.success("Updated");
        });
    };

    const handleFile = (file: any[]) => {
        const formik = formikRef.current;
        formik?.setValues({
            ...formik.values,
            ...{
                logo: file[0],
            },
        });
    };

    useEffect(() => {
        if (data) {
            const formik = formikRef.current;
            formik?.setValues({
                name: data.name,
                description: data.description,
                address: data.address,
                logo: data.logo,
                currency: data.currency,
                invoice_prefix: data.invoice_prefix,
                invoice_start_number: data.invoice_start_number,
                opening_cash_balance: data.opening_cash_balance,
            });
        }
    }, [data]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formikRef}
            onSubmit={handleSubmit}
        >
            {() => {
                const formik = formikRef.current;
                formik?.touched.logo && formik.errors.logo
                    ? setFileError(formik.errors.logo)
                    : setFileError("");

                return (
                    <Form className="min-w-[600px] bg-gray-50 p-4 border mx-4 rounded-lg text-gray-600">
                        <div className="my-4 font-semibold text-lg text-center">
                            Setup Organization
                        </div>
                        <TextInput name="name" label="Name" />
                        <TextInput name="description" label="Description" />
                        <TextInput name="address" label="Address" />
                        <FileInput
                            name="logo"
                            label="Logo"
                            onFileChange={(files: any) => {
                                handleFile(files || null);
                            }}
                            validationError={fileError}
                        />
                        <TextInput name="currency" label="Currency" />
                        <TextInput
                            name="invoice_prefix"
                            label="Invoice Prefix"
                        />
                        <TextInput
                            type="number"
                            name="invoice_start_number"
                            label="Invoice Start Number"
                        />
                        <TextInput
                            type="number"
                            name="opening_cash_balance"
                            label="Cash Opening Balance"
                        />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={submitting}
                                disabled={submitting}
                                type="submit"
                                className="rounded-md"
                            >
                                Update
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default SettingsForm;
