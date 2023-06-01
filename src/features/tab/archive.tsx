import {useGetAllActivitiesQuery} from "../../services/activities";
import React, {useEffect, useState} from "react";
import {CallingTableList} from "./activities";
import {useDispatch} from "react-redux";
import {setDialogStatus} from "../tabPanel/reloadDialogSlice";
import CallingListSkeleton from "../../app/layout/CallingListSkeleton";

export const ArchivedCallsTable = () => {
    const { data, error, isLoading } = useGetAllActivitiesQuery('');
    const [pageLoading, setPageLoading] = useState(false);
    const dispatch = useDispatch();

    if(isLoading || pageLoading) {
        return (<CallingListSkeleton />);
    }
    if(error) {
        dispatch(setDialogStatus(true));
    }

    return (
        <div>
            <CallingTableList items={data} showArchived={true} />
        </div>
    );
}