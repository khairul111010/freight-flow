import { Form, Formik, FormikProps } from "formik";
import { FC, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import Button from "../../../components/button";
import SelectInput from "../../../components/form/select-input";
import TextInput from "../../../components/form/text-input";
import { AppRoutesEnum } from "../../../enums/routeEnums";
import {
    useCreateVendorMutation,
    useUpdateVendorMutation,
} from "../../../store/apis/vendorApi";
type Props = { editData?: any | null; onSuccess?: (result: any) => void };
const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    currency: "BDT",
};

const validationSchema = object().shape({
    name: string().required("Name is required."),
    email: string().nullable(),
    phone: string().nullable(),
    address: string().nullable(),
    currency: string().oneOf(["BDT", "USD"]),
});
const VendorAddForm: FC<Props> = ({ editData, onSuccess }) => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);
    const [createVendor, { isLoading }] = useCreateVendorMutation();
    const [updateVendor, { isLoading: updating }] = useUpdateVendorMutation();
    const handleSubmit = (values: any) => {
        if (editData) {
            updateVendor({ id: values.id, body: values }).then((res: any) => {
                console.log(res);
                toast.success("Updated Successfully");
                navigate(AppRoutesEnum.VENDORS);
            });
        } else {
            createVendor(values).then((res: any) => {
                console.log(res);
                toast.success("Created Successfully");
                navigate(AppRoutesEnum.VENDORS);
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
                        <TextInput name="email" label="Email" />
                        <TextInput name="phone" label="Phone" />
                        <TextInput name="address" label="Address" />
                        <SelectInput
                            name="currency"
                            label="Currency"
                            options={[
                                { value: "BDT", label: "BDT" },
                                { value: "USD", label: "USD" },
                            ]}
                        />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading || updating}
                                disabled={isLoading || updating}
                                type="submit"
                                className="rounded-md"
                            >
                                {editData ? `Update` : `Add`} Carrier
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default VendorAddForm;
