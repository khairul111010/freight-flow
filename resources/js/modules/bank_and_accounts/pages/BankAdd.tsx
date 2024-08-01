import React from "react";
import BankForm from "../components/BankForm";

const BankAdd = () => {
    return (
        <div className="w-[800px] mx-auto">
            <div className="text-center my-3 text-xl font-semibold">
                Bank Add Form
            </div>

            <BankForm />
        </div>
    );
};

export default BankAdd;
