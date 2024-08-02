import React from "react";
import InvoiceAddForm from "../components/InvoiceAddForm";

const InvoiceAdd = () => {
    return (
        <div className="mx-auto">
            <div className="text-center my-3 text-xl font-semibold">
                Invoice and Bill Form
            </div>
            <InvoiceAddForm />
        </div>
    );
};

export default InvoiceAdd;
