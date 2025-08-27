import * as React from "react";
import {ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography,} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";

export function UserAvatarMenu(): ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);
    const currentUser = AUTHENTICATION_SERVICE.currentUserOrFail;

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleSignOut = async () => {
        try {
            setBusy(true);

            await AUTHENTICATION_SERVICE.logout();

            navigate("/login", {replace: true}); // TODO extract this to service
        } catch (e) {
            // You can show a toast/snackbar here
            console.error("Failed to sign out:", e);
        } finally {
            setBusy(false);
            handleClose();
        }
    };

    return (
        <>
            <Tooltip title="Account">
                <IconButton
                    onClick={handleOpen}
                    size="small"
                    sx={{ml: 2}}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <Avatar
                        alt={currentUser.displayName}
                        src={currentUser.avatarUrl}
                        sx={{width: 36, height: 36}}
                    />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        mt: 1.5,
                        overflow: "visible",
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: "right", vertical: "top"}}
                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
            >
                <MenuItem disableRipple disabled>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="subtitle2" noWrap>
                            {currentUser.displayName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                            {currentUser.email}
                        </Typography>
                    </div>
                </MenuItem>

                <Divider/>

                <MenuItem onClick={handleSignOut} disabled={busy}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Sign out
                </MenuItem>
            </Menu>
        </>
    );
}