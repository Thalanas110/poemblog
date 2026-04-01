import { useState } from "react";
import { loginAdmin } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Feather } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen bg-page">
      <div className="min-h-screen bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="glass-panel rounded-lg p-8 w-full max-w-md animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Feather className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-heading font-bold text-foreground">Admin Login</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="font-ui text-sm text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-secondary border-border font-ui"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="font-ui text-sm text-muted-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-secondary border-border font-ui"
                required
              />
            </div>
            {error && <p className="text-destructive text-sm font-ui">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full font-ui">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
