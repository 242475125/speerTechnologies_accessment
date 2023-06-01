import {useDispatch, useSelector} from "react-redux";
import {selectTabsIndex, setTabs} from "./tabPanelSlice";
import React, {useEffect, useState} from "react";
import {Tabs, Tab, List} from '@material-ui/core';
import {ActivitiesTable} from "../tab/activities";
import Box from '@mui/material/Box';
import {ArchivedCallsTable} from "../tab/archive";
import {
    IActivities,
    useGetAllActivitiesQuery,
    useResetArchivedActivitiesMutation,
    useUpdateActivityWithIDMutation
} from "../../services/activities";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArchiveIcon from "@mui/icons-material/Archive";
import ListItemText from "@mui/material/ListItemText";
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {Collapse} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {setDialogStatus} from "./reloadDialogSlice";
import CallingListSkeleton from "../../app/layout/CallingListSkeleton";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div
            role="tab-panel"
            hidden={value !== index}
            id={`activities-panel-${index}`}
            aria-labelledby={`activities-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index: number) => {
    return {
        id: `activities-tab-${index}`,
        'aria-controls': `activities-panel-${index}`,
    };
}

export const TabPanelMenuComponent = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
        dispatch(setTabs(value));
    };
    const dispatch = useDispatch();
    const selectedTab = useSelector(selectTabsIndex);
    return (
        <Box>
            <Tabs className='tabs-menu' value={selectedTab} onChange={handleChange}>
                <Tab className='item' label="Inbox" {...a11yProps(0)} />
                <Tab className='item' label="Archive" {...a11yProps(1)} />
            </Tabs>
        </Box>
    )
}

const ArchiveAllCallsButton = (props: any) => {
    const { items } = props;
    const [ updateActivityWithID, {isLoading, isError, error, isSuccess}] = useUpdateActivityWithIDMutation();

    const handleClick = () => {
        items.map((value: IActivities, index: number)=> {
            updateActivityWithID(value.id);
        })
    }

    return (
        <ListItemButton className='action-button' onClick={handleClick}>
            <ListItemIcon className='icon'>
                <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Archive all calls" />
        </ListItemButton>
    )
}

const UnArchiveCallsButton = () => {
    //TODO Need to figure out why the returning is error instead of success
    const [ resetArchivedActivities, {error} ] = useResetArchivedActivitiesMutation();
    const handleClick = () => {
        resetArchivedActivities('');
    }

    useEffect(()=> {
        if(error && (error as any).originalStatus === 200) {

        }
    }, [error])

    return (
        <ListItemButton className='action-button' onClick={handleClick}>
            <ListItemIcon className='icon'>
                <UnarchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Un-archive all calls" />
        </ListItemButton>
    )
}

export const TabPanelComponent = () => {
    const selectedTab = useSelector(selectTabsIndex);
    const { data, error, isLoading } = useGetAllActivitiesQuery('');

    if(isLoading) {
        return (<CallingListSkeleton />);
    }

    return (
        <div className='activities-tabs'>
            <TabPanel value={selectedTab} index={0}>
                <ArchiveAllCallsButton items={data} />
                <ActivitiesTable />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <UnArchiveCallsButton />
                <ArchivedCallsTable />
            </TabPanel>
        </div>
    );
};