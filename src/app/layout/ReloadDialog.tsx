import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectDialogStatus, setDialogStatus} from "../../features/tabPanel/reloadDialogSlice";
export default function ReloadDialog() {
    const dialogStatus = useSelector(selectDialogStatus);
    const theme = useTheme();
    const dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        dispatch(setDialogStatus(false));
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={dialogStatus}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText>
                        Error occurs. Please reload the page manually.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Reload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}