import React from "react";
import { useParams } from "react-router-dom";
import { useGetBankAccountQuery } from "../../../store/apis/bankApi";
import Spinner from "../../../components/preloader/Spinner";

const BankTransactions = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetBankAccountQuery(id);
    console.log(data);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center my-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }
    return <div>BankTransactions</div>;
};

export default BankTransactions;
