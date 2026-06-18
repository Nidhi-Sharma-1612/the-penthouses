import { LogIn } from "lucide-react";
import PasswordInput from "@/components/admin/PasswordInput";
import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-base">
      <form
        action={login}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-sm border border-border space-y-4"
      >
        <div className="text-center mb-2">
          <div className="flex flex-col items-center gap-0.5 mb-4" style={{ lineHeight: 1 }}>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "14px",
                letterSpacing: "0.22em",
                fontWeight: 400,
                color: "rgb(26, 26, 26)",
              }}
            >
              THE PENTHOUSES
            </span>
            <div className="flex items-center gap-1.5">
              <div style={{ height: "1px", width: "20px", background: "rgb(26, 26, 26)" }} />
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  fontWeight: 400,
                  color: "rgb(26, 26, 26)",
                }}
              >
                AT GRAND PLAZA
              </span>
              <div style={{ height: "1px", width: "20px", background: "rgb(26, 26, 26)" }} />
            </div>
          </div>
          <h1 className="font-heading text-2xl text-foreground" style={{ fontWeight: 400 }}>
            Administrator Login
          </h1>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
            Invalid email or password.
          </p>
        )}

        <div>
          <label className="block text-sm text-foreground mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A355]"
          />
        </div>

        <div>
          <label className="block text-sm text-foreground mb-1" htmlFor="password">
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C6A355]"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" name="rememberMe" className="rounded border-border" />
          Remember me
        </label>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-foreground text-white rounded-md py-2 text-sm font-medium hover:bg-text-primary cursor-pointer"
        >
          <LogIn size={15} strokeWidth={1.75} />
          Log in
        </button>
      </form>
    </div>
  );
}
