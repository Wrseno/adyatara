import { useSyncExternalStore } from "react";

// Hydration-safe mounted check using useSyncExternalStore
// This avoids the ESLint error about calling setState in useEffect
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        getClientSnapshot,
        getServerSnapshot
    );
}
