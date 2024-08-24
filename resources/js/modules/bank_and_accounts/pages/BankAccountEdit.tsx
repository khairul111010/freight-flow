import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/preloader/Spinner";
import BankForm from "../components/BankForm";
import {
    useLazyGetBankAccountQuery,
    useLazyGetBankQuery,
} from "../../../store/apis/bankApi";
import BankAccountForm from "../components/BankAccountForm";
import BackButton from "../../../components/button/BackButton";

const BankAccountEdit = () => {
    const { id } = useParams();

    const [getBankAccount, { data, isLoading }] = useLazyGetBankAccountQuery();

    useEffect(() => {
        if (id) {
            getBankAccount(id);
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }

    return (
        <div className="w-[800px] mx-auto">
            <BackButton />
            <div className="text-center my-3 text-xl font-semibold">
                Bank Account Edit Form
            </div>

            <BankAccountForm editData={data} />
        </div>
    );
};

export default BankAccountEdit;
