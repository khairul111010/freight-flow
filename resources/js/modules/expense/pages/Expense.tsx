import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "../../../components/model/Modal";
import ExpenseForm from "../components/ExpenseForm";
import Button from "../../../components/button";
import SearchInput from "../../../components/form/search-input/SearchInput";
import useDebounce from "../../../hooks/useDebounce";
import { useLazyGetExpenseQuery } from "../../../store/apis/expenseApi";
import SeparatedDateInput from "../../../components/form/date-input/SeparatedDateInput";
import Pagination from "../../../components/pagination";
import Spinner from "../../../components/preloader/Spinner";
import { DataTable } from "primereact/datatable";
import { classNames } from "primereact/utils";
import { Column } from "primereact/column";

const Expense = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const [open, setOpen] = useState(false);

    const [getExpense, { data, isLoading }] = useLazyGetExpenseQuery();

    useEffect(() => {
        getExpense({
            search: debouncedValue,
            page: 1,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        });
    }, [debouncedValue]);

    console.log(data && data);

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <div className="w-fit">
                        <SeparatedDateInput
                            onChange={(val: any) => setDate(val)}
                            value={date}
                        />
                    </div>
                    <Button
                        className="w-fit mt-1 rounded-md"
                        onClick={() => setOpen(true)}
                    >
                        Add Expense
                    </Button>
                </div>
                <SearchInput
                    name="search"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e)}
                />
            </div>
            <div className="mt-2">
                {isLoading ? (
                    <div className="flex items-center justify-center py-10">
                        <Spinner color="#44C7F4" />
                    </div>
                ) : (
                    <>
                        <DataTable
                            pt={{
                                column: {
                                    headerCell: {
                                        className:
                                            "bg-white px-4 py-4 text-[#9CA3AF] font-medium text-[12px]",
                                    },
                                    bodyCell: () => ({
                                        className: classNames(
                                            "px-4 text-[12px] py-2"
                                        ),
                                    }),
                                },
                                bodyRow: ({ context }: any) => ({
                                    className: classNames(
                                        context.stripedRows
                                            ? context.index % 2 === 0
                                                ? "bg-white text-gray-600"
                                                : "text-gray-600 bg-[#F9FAFB]"
                                            : "",
                                        "transition duration-200 border-b border-t border-[#E9E9E9]"
                                    ),
                                }),
                            }}
                            value={(data && data.data) || []}
                            stripedRows
                        >
                            <Column
                                field="expense_number"
                                header="Expense Number"
                            ></Column>
                            <Column field="date" header="Date"></Column>

                            <Column
                                field="amount"
                                header="Amount"
                                body={(rowData) => {
                                    return (
                                        <>{rowData.amount.toLocaleString()}</>
                                    );
                                }}
                            ></Column>
                            <Column
                                field="description"
                                header="Description"
                            ></Column>
                            <Column field="expense_note" header="Note"></Column>
                        </DataTable>
                        {data && (
                            <Pagination
                                className="my-5 flex justify-center"
                                totalPages={data.last_page || 1}
                                currentPage={data.current_page || 1}
                                perPage={data.per_page || 1}
                                onPageChange={({ currentPage }) =>
                                    getExpense({
                                        search: debouncedValue,
                                        page: currentPage,
                                        month: date.getMonth() + 1,
                                        year: date.getFullYear(),
                                    })
                                }
                            />
                        )}
                    </>
                )}
            </div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Expense Form"
            >
                <ExpenseForm onSuccess={() => setOpen(false)} />
            </Modal>
        </div>
    );
};

export default Expense;
