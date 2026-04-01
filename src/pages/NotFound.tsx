import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="admin-shell min-h-screen bg-page">
      <div className="admin-shell-overlay min-h-screen flex items-center justify-center px-4">
        <div className="text-center admin-editor-panel rounded-2xl p-8 max-w-md w-full">
          <h1 className="mb-4 text-4xl font-heading font-bold text-amber-50">404</h1>
          <p className="mb-4 text-xl text-amber-100/75">Oops! Page not found</p>
          <a href="/" className="font-ui text-amber-200 underline hover:text-amber-100">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
