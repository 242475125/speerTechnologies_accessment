import {List, ListItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {IActivities, useGetAllActivitiesQuery, useUpdateActivityWithIDMutation} from "../../services/activities";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArchiveIcon from '@mui/icons-material/Archive';
import {
    Avatar, Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemAvatar,
    Typography
} from "@mui/material";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import {setDialogStatus} from "../tabPanel/reloadDialogSlice";
import {useDispatch} from "react-redux";
import CallingListSkeleton from "../../app/layout/CallingListSkeleton";

const iconOfCallingType = (value: string) => {
    switch (value) {
        case 'missed':
            return <PhoneMissedIcon color={'error'} />;
        case 'voicemail':
            return <VoicemailIcon color={'info'} />;
        default:
            return <PhoneInTalkIcon color={'success'} />;
    }
}

const callingType = (value: string) => {
    switch (value) {
        case 'missed':
            return 'Missed Call';
        case 'voicemail':
            return 'Voice Mail';
        default:
            return 'Answered Call';
    }
}

const convertDateTime = (value: string) => {
    const date = new Date(value);
    return `${date.getMonth()}-${date.getDate()} ${date.getMinutes()}:${date.getSeconds()}`;
}

const convertSecondsToTime = (value: number) => {
    return ~~((value % 3600) / 60);
}

export const CallingTableList = (props: any) => {
    const {items, showArchived} = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [currentDetailsOfCall, setCurrentDetailsOfCall] = useState({});
    const handleClick = (value: IActivities) => {
        setOpenDialog(true);
        setCurrentDetailsOfCall(value);
    }
    const closeDialog = () => {
        setOpenDialog(false);
        setCurrentDetailsOfCall({});
    };

    return (
        <List>
            {items.filter( (activity:IActivities) => activity.is_archived === showArchived).map((activity: IActivities) => (
                <ListItemButton key={activity.id} onClick={()=> handleClick(activity)}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {iconOfCallingType(activity.call_type)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={callingType(activity.call_type)}
                                      secondary={
                                          <React.Fragment>
                                              <Typography
                                                  className='warp-word'
                                                  sx={{ display: 'inline' }}
                                                  component="span"
                                                  variant="body2"
                                                  color="text.primary"
                                              >
                                                  {`ID: ${activity.id}`}
                                              </Typography>
                                              <br />{`Called at: ${convertDateTime(activity.created_at)}`}
                                              <br />{activity.duration > 0 ? `Duration: ${convertSecondsToTime(activity.duration)} min(s)` : ''}
                                          </React.Fragment>
                                      } />
                    </ListItem>
                </ListItemButton>
            ))}
            <Dialog
                open={openDialog}
                onClose={closeDialog}
            >
                <DialogTitle>
                    {"Details of the call"}
                </DialogTitle>
                <DialogContent>
                    <List>
                        {Object.keys(currentDetailsOfCall).map((value) => {
                            return (
                                <ListItem
                                    key={value}
                                >
                                    <ListItemText primary={`${value}: `} />
                                    <ListItemText primary={`${(currentDetailsOfCall as any)[value]}`} />
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    )
}

export const ActivitiesTable = () => {
    const { data, error, isLoading } = useGetAllActivitiesQuery('');
    const [pageLoading, setPageLoading] = useState(false);
    const dispatch = useDispatch();

    if(isLoading || pageLoading) {
        return (<CallingListSkeleton />);
    }
    if(error) {
        // dispatch(setDialogStatus(true));
    }

    return (
        <div>
            <CallingTableList items={data} showArchived={false} />
        </div>
    );
}