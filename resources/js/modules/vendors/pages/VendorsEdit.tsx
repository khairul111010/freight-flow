import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetVendorQuery } from "../../../store/apis/vendorApi";
import Spinner from "../../../components/preloader/Spinner";
import VendorAddForm from "../components/VendorAddForm";

const VendorsEdit = () => {
    const { id } = useParams();

    const [getVendor, { data, isLoading }] = useLazyGetVendorQuery();

    useEffect(() => {
        if (id) {
            getVendor(id);
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
                Vendor Edit Form
            </div>

            <VendorAddForm editData={data} />
        </div>
    );
};

export default VendorsEdit;
