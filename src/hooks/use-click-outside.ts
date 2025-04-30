import { RefObject, useEffect } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement|null>, callback: () => void) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if(e.target instanceof Element && ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        }

        document.addEventListener('mousedown', listener);

        return () => document.removeEventListener('mousedown', listener);
    });
}
