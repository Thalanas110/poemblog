import { useState } from "react";
import { loginAdmin } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Feather } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginAdmin(email, password);
      if (!result.isAdmin) {
        setError("You are not an admin.");
        return;
      }
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-shell min-h-screen bg-page px-4 py-6 sm:px-6 md:py-10">
      <div className="admin-login-backdrop" aria-hidden="true" />

      <div className="admin-login-layout">
        <div className="admin-story animate-fade-in">
          <div className="admin-story-copy">
            <p className="admin-story-kicker font-ui text-xs uppercase tracking-[0.2em]">Hidden Garden Access</p>
            <h1 className="admin-story-title mt-4 text-3xl font-heading font-semibold leading-tight sm:text-5xl">
              Enter the
              <span className="admin-story-title-emphasis block">Poet's Enchanted Archive</span>
            </h1>
            <p className="admin-story-body mt-4 max-w-md text-base sm:text-lg">
              Only the keeper of verses may pass. Sign in to write, revise, and publish every whisper of the woods.
            </p>
          </div>
        </div>

        <div className="admin-login-panel animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Feather className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-heading font-bold text-foreground">Admin Login</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-ui text-sm text-foreground/80">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-11 rounded-md bg-background/65 border-border/80 font-ui text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="font-ui text-sm text-foreground/80">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-md bg-background/65 border-border/80 font-ui pr-11 text-foreground"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-destructive text-sm font-ui">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full h-11 font-ui tracking-wide">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
