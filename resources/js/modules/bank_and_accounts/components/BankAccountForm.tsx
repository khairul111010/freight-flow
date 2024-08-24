import { Form, Formik, FormikProps } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { number, object, string } from "yup";
import TextInput from "../../../components/form/text-input";
import Button from "../../../components/button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppRoutesEnum } from "../../../enums/routeEnums";
import {
    useCreateBankAccountMutation,
    useCreateBankMutation,
    useGetBanksQuery,
    useUpdateBankAccountMutation,
    useUpdateBankMutation,
} from "../../../store/apis/bankApi";
import SelectInput from "../../../components/form/select-input";

type Props = { editData?: any | null; onSuccess?: (result: any) => void };
const initialValues = {
    account_name: "",
    account_number: "",
    account_routing_number: "",
    opening_bank_balance: 0,
    branch: "",
    bank_id: null,
};

const validationSchema = object().shape({
    account_name: string().required("Account Name is required."),
    account_number: string().required("Account Number is required."),
    account_routing_number: string().required("Routing Number is required."),
    opening_bank_balance: number().required("Opening Balance is required."),
    branch: string().required("Branch is required."),
    bank_id: number().required("Bank is required."),
});
const BankAccountForm: FC<Props> = ({ editData, onSuccess }) => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<any>>(null);
    const { data: banksAll, isLoading: banksLoading } = useGetBanksQuery();
    const [createBankAccount, { isLoading }] = useCreateBankAccountMutation();
    const [updateBankAccount, { isLoading: updating }] =
        useUpdateBankAccountMutation();
    const handleSubmit = (values: any) => {
        const _values = {
            ...values,
            opening_bank_balance: Number(values.opening_bank_balance),
        };
        if (editData) {
            updateBankAccount({ id: values.id, body: _values }).then(
                (res: any) => {
                    toast.success("Updated Successfully");
                    navigate(AppRoutesEnum.BANK);
                }
            );
        } else {
            createBankAccount(_values).then((res: any) => {
                toast.success("Created Successfully");
                navigate(AppRoutesEnum.BANK);
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
                        <TextInput name="account_name" label="Account Name" />
                        <TextInput
                            name="account_number"
                            label="Account Number"
                        />
                        <TextInput
                            name="account_routing_number"
                            label="Account Routing Number"
                        />
                        <TextInput
                            name="opening_bank_balance"
                            label="Opening Balance"
                        />
                        <TextInput name="branch" label="Branch" />
                        <SelectInput
                            name="bank_id"
                            label="Bank"
                            options={
                                (banksAll &&
                                    banksAll.map((bank: any) => {
                                        return {
                                            label: bank.name,
                                            value: bank.id,
                                        };
                                    })) ||
                                []
                            }
                            isLoading={banksLoading}
                        />

                        <div className="flex items-center justify-center">
                            <Button
                                loading={isLoading || updating}
                                disabled={isLoading || updating}
                                type="submit"
                                className="rounded-md"
                            >
                                {editData ? `Update` : `Add`} Bank Account
                            </Button>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default BankAccountForm;
