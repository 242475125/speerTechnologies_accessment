import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {IActivities} from "../../services/activities";
import ListItemButton from "@mui/material/ListItemButton";
import {ListItem} from "@material-ui/core";
import {Avatar, ListItemAvatar, Typography} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function CallingListSkeleton() {
    return (
        <div>
            <ListItemButton className='action-button'>
                <Skeleton variant="rounded" width={20} height={20} sx={{
                    margin: '25px 30px 0 20px'
                }} />
                <ListItemText primary={
                    <React.Fragment>
                        <Skeleton variant="rounded" height={20} width={240} sx={{
                            margin: '25px 0 0 0'
                        }} />
                    </React.Fragment>
                } />
            </ListItemButton>
            {[0,1,2,3,4,5].map((ele, index) => (
                <ListItemButton key={index}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <Skeleton animation="wave" variant="circular" width={40} height={40} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={
                            <React.Fragment>
                                <Skeleton variant="rounded" height={20} />
                            </React.Fragment>
                        }
                                      secondary={
                                          <React.Fragment>
                                              <Skeleton variant="rounded" height={60} />
                                          </React.Fragment>
                                      } />
                    </ListItem>
                </ListItemButton>
            ))}
      </div>
    );
}