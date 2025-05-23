import { useEffect, useState } from "react";

export default function useIsDesktop() {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const setWidthFunc = () => setWidth(window.innerWidth);

        window.addEventListener('resize', setWidthFunc);

        return () => {
            window.removeEventListener('resize', setWidthFunc);
        }
    }, []);

    return width > 768;
}
