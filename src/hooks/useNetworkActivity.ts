import { useEffect, useState } from "react";
import {
  getPendingNetworkRequests,
  subscribeToNetworkActivity,
} from "@/lib/networkActivity";

export function useNetworkActivity() {
  const [pendingRequests, setPendingRequests] = useState(getPendingNetworkRequests);

  useEffect(() => {
    return subscribeToNetworkActivity(setPendingRequests);
  }, []);

  return {
    pendingRequests,
    isNetworkBusy: pendingRequests > 0,
  };
}
