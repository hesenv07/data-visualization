import { useMemo } from "react"
import { useLocation } from "react-router-dom"

export const useLocationPath = () => {
    const location = useLocation()
    const from = useMemo(() => location?.pathname, [location])

    return { from }
}