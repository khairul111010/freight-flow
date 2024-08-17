import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBillQuery } from "../../../store/apis/invoiceApi";
import Spinner from "../../../components/preloader/Spinner";
import Modal from "../../../components/model/Modal";
import BillPayForm from "../components/BillPayForm";

const BillsEdit = () => {
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const { data, isLoading } = useGetBillQuery(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }
    return (
        <>
            <div className="bg-white p-8 rounded-md h-full">
                <div className="flex items-center justify-between font-semibold text-lg border-b pb-4">
                    <div>Bill</div>
                    <div>#{data?.invoice_number}</div>
                </div>

                <div className="flex items-center justify-between mt-8">
                    <div>
                        <div className="italic">INVOICE TO</div>
                        <div className="font-bold">{data?.vendor.name}</div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div>
                            <div className="italic">Issued Date</div>
                            <div className="font-bold">
                                {data?.bill_issue_date}
                            </div>
                        </div>
                        <div>
                            <div className="italic">Due Date</div>
                            <div className="font-bold">
                                {data?.bill_due_date}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-start justify-between">
                        <div className="font-bold text-base italic">
                            Service Details
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="italic">MAWB: </div>
                                <div className="font-bold text-right">
                                    {data?.master_air_way_bill}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="italic">Destination: </div>
                                <div className="font-bold text-right">
                                    {data?.destination}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="italic">Cartoon Amount: </div>
                                <div className="font-bold text-right">
                                    {data?.cartoon_amount}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="italic">
                                    Chargeable Weight:{" "}
                                </div>
                                <div className="font-bold text-right">
                                    {data?.chargeable_weight}
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="border mt-4 w-full">
                        <thead>
                            <tr className="divide-x border-b italic">
                                <th className="p-2">Description</th>
                                <th className="p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="divide-x">
                                <th className="p-2 text-left">MAWB Fee</th>
                                <th className="p-2 text-right">
                                    {data?.master_air_way_bill_fee}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill Rate</th>
                                <th className="p-2 text-right">
                                    {data?.bill_rate}
                                </th>
                            </tr>

                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill AIT</th>
                                <th className="p-2 text-right">
                                    {data?.bill_ait}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill AMS</th>
                                <th className="p-2 text-right">
                                    {data?.bill_ams}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill CD</th>
                                <th className="p-2 text-right">
                                    {data?.bill_cd}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill CGC</th>
                                <th className="p-2 text-right">
                                    {data?.bill_cgc}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill IIT</th>
                                <th className="p-2 text-right">
                                    {data?.bill_itt}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill SSC</th>
                                <th className="p-2 text-right">
                                    {data?.bill_ssc}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-left">Bill THC</th>
                                <th className="p-2 text-right">
                                    {data?.bill_thc}
                                </th>
                            </tr>

                            <tr className="divide-x">
                                <th className="p-2 text-left">VAT</th>
                                <th className="p-2 text-right">
                                    {data?.bill_vat}
                                </th>
                            </tr>
                            <tr>
                                <th className="p-2 text-left">TOTAL (USD)</th>
                                <th className="p-2 text-right">
                                    = {data?.bill_total_usd}
                                </th>
                            </tr>
                            <tr>
                                <th className="p-2 text-left">Exchange Rate</th>
                                <th className="p-2 text-right">
                                    = {data?.bill_exchange_rate}
                                </th>
                            </tr>
                            <tr>
                                <th className="p-2 text-left">TOTAL (BDT)</th>
                                <th className="p-2 text-right">
                                    {data?.bill_total_usd} x{" "}
                                    {data?.bill_exchange_rate} ={" "}
                                    {data?.bill_payable_bdt}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white p-8 rounded-md h-full mt-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-base font-semibold">Transactions</h1>
                    <button
                        className="w-fit bg-primary text-white px-8 py-2 rounded-md"
                        onClick={() => setOpen(true)}
                    >
                        Payment
                    </button>
                </div>
                <div className="grid grid-cols-2 text-base font-normal italic border-t border-l border-r divide-x">
                    <div className="p-2">Paid</div>
                    <div className="p-2">Due</div>
                </div>
                <div className="grid grid-cols-2 border-t border-r">
                    {data?.transactions.map(
                        (transaction: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 items-center gap-4 border-b border-l"
                                >
                                    <div>{transaction.transaction_date}</div>
                                    <div>
                                        {transaction.is_debit === 1 && index > 3
                                            ? data?.transactions[index].amount -
                                              data?.transactions[index - 2]
                                                  .amount
                                            : transaction.amount.toLocaleString()}
                                    </div>
                                    <div>
                                        {transaction.payment_method === "bank"
                                            ? `${transaction.bank_account.account_name} - ${transaction.bank_account.account_number}`
                                            : transaction.payment_method}
                                    </div>
                                    <div>{transaction.transaction_note}</div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>

            <Modal
                onClose={() => setOpen(false)}
                open={open}
                title="Bill Payment"
            >
                <BillPayForm />
            </Modal>
        </>
    );
};

export default BillsEdit;
