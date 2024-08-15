import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export function useActivity() {
    const context = useContext(ActivityContext)
    if (!context) {
        throw new Error('ActivityContext must be within ActivityProvider')
    }
    return context
}