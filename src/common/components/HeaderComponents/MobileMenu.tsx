import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";

interface MobileMenuProps {
    isOpen: boolean,
    toggleMobileMenu: () => void
}

export default function MobileMenu(props: MobileMenuProps) {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.toggleMobileMenu();
    };

    return (
        <Button variant="text" onClick={handleClick}>
            <>
                <Avatar
                    alt="menu-icon"
                    src={getSingleAssetSrc( props.isOpen ? "CLOSE" : "MENU").default}
                    style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                    }}
                />
            </>
        </Button>
    );
}