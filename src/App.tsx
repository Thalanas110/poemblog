import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useNetworkActivity } from "@/hooks/useNetworkActivity";
import { installNetworkActivityTracker } from "@/lib/networkActivity";
import Index from "./pages/Index.tsx";
import PoemPage from "./pages/PoemPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import LoadingPage from "./pages/LoadingPage.tsx";
import NotFound from "./pages/NotFound.tsx";

installNetworkActivityTracker();

const queryClient = new QueryClient();

const AppShell = () => {
  const { isNetworkBusy, pendingRequests } = useNetworkActivity();
  return (
    <>
      {isNetworkBusy ? <LoadingPage pendingRequests={pendingRequests} /> : null}
      <div className={isNetworkBusy ? "opacity-0 pointer-events-none select-none" : "opacity-100"} aria-hidden={isNetworkBusy}>
        <BrowserRouter future={{ v7_startTransition: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/poem/:slug" element={<PoemPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppShell />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
