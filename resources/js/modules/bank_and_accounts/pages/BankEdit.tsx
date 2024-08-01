import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/preloader/Spinner";
import BankForm from "../components/BankForm";
import { useLazyGetBankQuery } from "../../../store/apis/bankApi";

const BankEdit = () => {
    const { id } = useParams();

    const [getBank, { data, isLoading }] = useLazyGetBankQuery();

    useEffect(() => {
        if (id) {
            getBank(id);
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
            <div className="text-center my-3 text-xl font-semibold">
                Bank Edit Form
            </div>

            <BankForm editData={data} />
        </div>
    );
};

export default BankEdit;
