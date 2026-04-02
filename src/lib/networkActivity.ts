type NetworkListener = (pendingRequests: number) => void;

const listeners = new Set<NetworkListener>();
let pendingRequests = 0;
let installed = false;

function notifyListeners() {
  listeners.forEach((listener) => listener(pendingRequests));
}

function incrementPendingRequests() {
  pendingRequests += 1;
  notifyListeners();
}

function decrementPendingRequests() {
  pendingRequests = Math.max(0, pendingRequests - 1);
  notifyListeners();
}

export function getPendingNetworkRequests() {
  return pendingRequests;
}

export function subscribeToNetworkActivity(listener: NetworkListener) {
  listeners.add(listener);
  listener(pendingRequests);

  return () => {
    listeners.delete(listener);
  };
}

export function installNetworkActivityTracker() {
  if (installed || typeof window === "undefined") {
    return;
  }

  const originalFetch = window.fetch.bind(window);

  const trackedFetch: typeof window.fetch = (...args) => {
    incrementPendingRequests();

    return originalFetch(...args).finally(() => {
      decrementPendingRequests();
    });
  };

  window.fetch = trackedFetch;
  installed = true;
}
