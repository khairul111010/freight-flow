import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/button";
import Modal from "../../../components/model/Modal";
import Spinner from "../../../components/preloader/Spinner";
import { BASE_API_URL } from "../../../env";
import { useGetInvoiceQuery } from "../../../store/apis/invoiceApi";
import { useGetOrganizationQuery } from "../../../store/apis/organizationApi";
import { convertImageToBase64 } from "../../../utils/imageConvertion/convertImageToBase64";
import InvoicePayForm from "../components/InvoicePayForm";
import InvoicePDF from "../components/InvoicePDF";
const InvoiceEdit = () => {
    const [imageData, setImageData] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const { data, isLoading } = useGetInvoiceQuery(id);
    const { data: organizationData } = useGetOrganizationQuery();

    const handleDownload = () => {
        const element = document.getElementById("invoice");
        html2pdf().from(element).save(`#INV-${data.invoice_number}.pdf`);
    };

    useEffect(() => {
        const imgUrl =
            "https://raw.githubusercontent.com/khairul111010/freight-flow/master/public/logo.png";
        convertImageToBase64(imgUrl).then((res) => setImageData(res));
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10">
                <Spinner color="#44C7F4" />
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-end">
                <Button className="rounded-md mb-2" onClick={handleDownload}>
                    Download
                </Button>
            </div>
            <div className="hidden">
                {imageData && (
                    <InvoicePDF
                        invoiceData={data}
                        organizationData={organizationData}
                        imageData={imageData}
                    />
                )}
            </div>
            <div className="bg-white p-8 rounded-md h-full">
                <div className="flex items-center justify-between font-semibold text-lg border-b pb-4">
                    <div className="flex items-center gap-2 text-gray-500">
                        <div>
                            <img
                                src={
                                    organizationData && organizationData.logo
                                        ? BASE_API_URL.replace(
                                              "api",
                                              organizationData.logo
                                          )
                                        : BASE_API_URL.replace(
                                              "api",
                                              `uploads/logo/logo.png`
                                          )
                                }
                                alt=""
                                className="w-40"
                            />
                        </div>
                        <div className="text-xs">
                            <div>{organizationData.address}</div>
                            <div>{organizationData.description}</div>
                        </div>
                    </div>
                    <div>
                        <div>Invoice</div>
                        <div className="text-gray-500">
                            #{data?.invoice_number}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                    <div>
                        <div className="italic">BILL TO</div>
                        <div className="font-bold">{data?.customer.name}</div>
                    </div>
                    <div className="flex items-center gap-8">
                        <div>
                            <div className="italic">Issued Date</div>
                            <div className="font-bold">{data?.issue_date}</div>
                        </div>
                        <div>
                            <div className="italic">Due Date</div>
                            <div className="font-bold">
                                {data?.invoice_due_date}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-end justify-between">
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
                                <th className="p-2 w-[10%]">SL</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="divide-x">
                                <th className="p-2 text-center">1</th>
                                <th className="p-2 text-left">MAWB Fee</th>
                                <th className="p-2 text-right">
                                    {data?.master_air_way_bill_fee}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">2</th>
                                <th className="p-2 text-left">
                                    Chargable Weight
                                </th>
                                <th className="p-2 text-right">
                                    {data?.chargeable_weight}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">3</th>
                                <th className="p-2 text-left">Rate</th>
                                <th className="p-2 text-right">
                                    {data?.invoice_rate}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">4</th>
                                <th className="p-2 text-left">AIT</th>
                                <th className="p-2 text-right">{data?.ait}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">5</th>
                                <th className="p-2 text-left">AMS</th>
                                <th className="p-2 text-right">{data?.ams}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">6</th>
                                <th className="p-2 text-left">CD</th>
                                <th className="p-2 text-right">{data?.cd}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">7</th>
                                <th className="p-2 text-left">CGC</th>
                                <th className="p-2 text-right">{data?.cgc}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">8</th>
                                <th className="p-2 text-left">DTC</th>
                                <th className="p-2 text-right">{data?.dtc}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">9</th>
                                <th className="p-2 text-left">IIT</th>
                                <th className="p-2 text-right">{data?.itt}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">10</th>
                                <th className="p-2 text-left">SSC</th>
                                <th className="p-2 text-right">{data?.ssc}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">11</th>
                                <th className="p-2 text-left">THC</th>
                                <th className="p-2 text-right">{data?.thc}</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">12</th>
                                <th className="p-2 text-left">Others</th>
                                <th className="p-2 text-right">
                                    {data?.others}
                                </th>
                            </tr>
                            <tr className="divide-x">
                                <th className="p-2 text-center">13</th>
                                <th className="p-2 text-left">Vat</th>
                                <th className="p-2 text-right">
                                    {data?.invoice_vat}
                                </th>
                            </tr>
                            <tr className="">
                                <th className="p-2 text-center">Total USD</th>
                                <th className="p-2 text-left"></th>
                                <th className="p-2 text-right">
                                    {data?.invoice_total_usd}
                                </th>
                            </tr>
                            <tr className="">
                                <th className="p-2 text-center">
                                    Exchange Rate
                                </th>
                                <th className="p-2 text-left"></th>
                                <th className="p-2 text-right">
                                    {data?.exchange_rate}
                                </th>
                            </tr>
                            <tr className="">
                                <th className="p-2 text-center">Total BDT</th>
                                <th className="p-2 text-left"></th>
                                <th className="p-2 text-right">
                                    {data?.invoice_receivable_amount_bdt}
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
                    <div className="p-2">Due</div>
                    <div className="p-2">Received</div>
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

            <Modal
                onClose={() => setOpen(false)}
                open={open}
                title="Invoice Payment"
            >
                <InvoicePayForm onSuccess={() => setOpen(false)} />
            </Modal>
        </>
    );
};

export default InvoiceEdit;
