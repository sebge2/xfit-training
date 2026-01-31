import {ReactNode, useId, useState} from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export type MoreActionButtonAction = {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
};

export function MoreActionsButton({actions}: { actions: MoreActionButtonAction[] }) {
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    return (
        <>
            <IconButton
                id={buttonId}
                size="small"
                aria-label="More actions"
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <MoreVertIcon fontSize="small"/>
            </IconButton>

            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    root: {
                        "aria-labelledby": buttonId,
                    }
                }}>
                {actions.map((a) => (
                    <MenuItem
                        key={a.label}
                        disabled={a.disabled}
                        onClick={() => {
                            setAnchorEl(null);
                            a.onClick();
                        }}
                    >
                        {a.icon && <ListItemIcon>{a.icon}</ListItemIcon>}
                        {a.label && <ListItemText>{a.label}</ListItemText>}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}