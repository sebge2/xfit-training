import Box from "@mui/material/Box";
import {ActionsContainer} from "../../../components/core/interaction/ActionsContainer.tsx";
import {AUTHENTICATION_SERVICE} from "../../../services/authentication-service.ts";
import {Permission} from "../../../model/auth/permission.ts";
import {AddButton} from "../../../components/core/buttton/AddButton.tsx";
import {useNavigate} from "react-router-dom";

export function WodsGrid({children}: { children: React.ReactNode }) {
    const navigate = useNavigate();

    function onNewWod() {
        navigate("./new");
    }

    return <>
        <Box
            sx={{
                width: 'calc(100%-2rem)',
                display: 'grid',
                margin: '2rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(25rem, 100%), 1fr))',
                gap: 2,
            }}>
            {children}
        </Box>
        <Box sx={{m: '1rem'}}>
            <ActionsContainer>
                {AUTHENTICATION_SERVICE.currentUserOrFail.hasPermission(Permission.ADD_WOD) &&
                    <AddButton onAdd={onNewWod}/>}
            </ActionsContainer>
        </Box>
    </>
}