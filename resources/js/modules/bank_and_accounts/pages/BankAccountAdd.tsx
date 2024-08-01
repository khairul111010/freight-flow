import React from "react";
import BankAccountForm from "../components/BankAccountForm";

const BankAccountAdd = () => {
    return (
        <div className="w-[800px] mx-auto">
            <div className="text-center my-3 text-xl font-semibold">
                Bank Account Add Form
            </div>

            <BankAccountForm />
        </div>
    );
};

export default BankAccountAdd;
