import { useState, useEffect } from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    function handleWindowSizeChange() {
        console.log('resize')
        setIsMobile(window.innerWidth < 720)

    }
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return isMobile;
}