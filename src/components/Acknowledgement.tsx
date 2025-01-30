"use client";

import React, { useState, useEffect } from "react";
import { Fade } from "@/once-ui/components";
import styles from "./Acknowledgement.module.scss";

export default function Acknowledgement() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        // Check sessionStorage to see if the user has acknowledged
    const hasAcknowledged = sessionStorage.getItem("hasAcknowledged") === "true";
    if (!hasAcknowledged) {
        setIsOpen(true);
        sessionStorage.setItem("hasAcknowledged", "true");
    }
    }, []);

    const handleClose = () => {
        sessionStorage.setItem("hasAcknowledged", "true");
        setIsOpen(false);
    };

    return (
        <>
        {isOpen && (
            <div className={styles.modalOverlay}>
                <Fade   
                    className={styles.modalContainer}    
                    to="top"
                    base="page"
                    blur={0.5}
                    pattern={{ display: true, size: "4" }}
                    style={{ zIndex: 999 }}
                    >
                    <div>
                        <h2 className={styles.modalTitle}>Acknowledgement of Country</h2>
                        <p className={styles.modalText}>
                            In the spirit of reconciliation and unity, I acknowledge the Traditional Custodians of country 
                            throughout Australia and their connections to the land, sea, sky, and community. I pay my respect
                            to their Elders past and present and extend that respect to all Aboriginal and Torres Strait 
                            Islander peoples today.                    
                        </p>
                        <button className={styles.modalButton} onClick={handleClose}>
                            Acknowledge
                        </button>
                    </div>
                </Fade>
            </div>
        )}
        </> 
    );
}