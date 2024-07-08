import { useEffect, useState } from "react"


export const useWindowSize = () =>{
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', updateSize)

        // Cleanup function
        return () => window.removeEventListener('resize', updateSize);
    }, []); // Empty dependency array to run only on mount and unmount


    return {
        width: size[0],
        height: size[1]
    }
}