import { FC } from "react";
type Props = {
    invoiceData?: any;
    organizationData?: any;
    imageData: any;
};
const InvoicePDF: FC<Props> = ({
    invoiceData,
    organizationData,
    imageData,
}) => {
    return (
        <div className="bg-white p-8 text-xs" id="invoice">
            <div className="rounded-md">
                <div className="flex items-center justify-between font-semibold border-b pb-1">
                    <div className="flex items-center gap-2 text-gray-500">
                        <div>
                            {imageData && (
                                <img src={imageData} alt="" className="w-40" />
                            )}
                        </div>
                        <div className="text-xs">
                            <div>{organizationData?.address}</div>
                            <div>{organizationData?.description}</div>
                        </div>
                    </div>
                    <div>
                        <div>Invoice</div>
                        <div className="text-gray-500">
                            #{invoiceData?.invoice_number}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div>
                        <div className="italic">BILL TO</div>
                        <div className="font-bold">
                            {invoiceData?.customer.name}
                        </div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div>
                            <div className="italic">Issued Date</div>
                            <div className="font-bold">
                                {invoiceData?.issue_date}
                            </div>
                        </div>
                        <div>
                            <div className="italic">Due Date</div>
                            <div className="font-bold">
                                {invoiceData?.invoice_due_date}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <div className="flex items-end justify-between">
                        <div className="font-bold text-base italic">
                            Service Details
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="italic">MAWB: </div>
                                <div className="font-bold text-right">
                                    {invoiceData?.master_air_way_bill}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="italic">Destination: </div>
                                <div className="font-bold text-right">
                                    {invoiceData?.destination}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="italic">Cartoon Amount: </div>
                                <div className="font-bold text-right">
                                    {invoiceData?.cartoon_amount}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="italic">
                                    Chargeable Weight:{" "}
                                </div>
                                <div className="font-bold text-right">
                                    {invoiceData?.chargeable_weight}
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="border mt-2 w-full">
                        <thead>
                            <tr className="divide-x border-b italic">
                                <th className="p-1 w-[10%]">SL</th>
                                <th className="p-1">Description</th>
                                <th className="p-1">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="divide-x">
                                <th className="p-1 text-center">1</th>
                                <th className="p-1 text-left">MAWB Fee</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.master_air_way_bill_fee}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">2</th>
                                <th className="p-1 text-left">
                                    Chargable Weight
                                </th>
                                <th className="p-1 text-right">
                                    {invoiceData?.chargeable_weight}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">3</th>
                                <th className="p-1 text-left">Rate</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.invoice_rate}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">4</th>
                                <th className="p-1 text-left">AIT</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.ait}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">5</th>
                                <th className="p-1 text-left">AMS</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.ams}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">6</th>
                                <th className="p-1 text-left">CD</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.cd}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">7</th>
                                <th className="p-1 text-left">CGC</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.cgc}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">8</th>
                                <th className="p-1 text-left">DTC</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.dtc}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">9</th>
                                <th className="p-1 text-left">IIT</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.itt}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">10</th>
                                <th className="p-1 text-left">SSC</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.ssc}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">11</th>
                                <th className="p-1 text-left">THC</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.thc}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">12</th>
                                <th className="p-1 text-left">Others</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.others}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-1 text-center">13</th>
                                <th className="p-1 text-left">Vat</th>
                                <th className="p-1 text-right">
                                    {invoiceData?.invoice_vat}
                                </th>
                            </tr>
                            <tr className="">
                                <th className="p-1 text-center">Total USD</th>
                                <th className="p-1 text-left"></th>
                                <th className="p-1 text-right">
                                    {invoiceData?.invoice_total_usd}
                                </th>
                            </tr>
                            <tr className="">
                                <th className="p-1 text-center">
                                    Exchange Rate
                                </th>
                                <th className="p-1 text-left"></th>
                                <th className="p-1 text-right">
                                    {invoiceData?.exchange_rate}
                                </th>
                            </tr>
                            <tr className="">
                                <th className="p-1 text-center">Total BDT</th>
                                <th className="p-1 text-left"></th>
                                <th className="p-1 text-right text-primary">
                                    {invoiceData?.invoice_receivable_amount_bdt}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="rounded-md mt-2">
                <div className="flex items-center justify-between mb-1">
                    <h1 className="font-semibold">Payment Histories</h1>
                </div>
                <div className="grid grid-cols-2 font-normal italic border-t border-l border-r divide-x">
                    <div className="p-1">Due</div>
                    <div className="p-1">Received</div>
                </div>
                <div className="grid grid-cols-2 border-t border-r">
                    {invoiceData?.transactions.map(
                        (transaction: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-4 items-center gap-4 border-b border-l"
                                >
                                    <div>{transaction.transaction_date}</div>
                                    <div>
                                        {transaction.is_debit === 0
                                            ? transaction.current_amount.toLocaleString()
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
        </div>
    );
};

export default InvoicePDF;
