import { KeyRound } from "lucide-react";
import { FormField, inputClass } from "@/components/admin/FormField";
import PasswordInput from "@/components/admin/PasswordInput";
import { changePassword } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  current: "Current password is incorrect.",
  length: "New password must be at least 8 characters.",
  mismatch: "New password and confirmation do not match.",
};

export default async function AdminChangePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { error, success } = await searchParams;

  return (
    <div>
      {error && (
        <p className="mb-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2 max-w-2xl">
          {ERROR_MESSAGES[error] ?? "Something went wrong."}
        </p>
      )}
      {success && (
        <p className="mb-5 text-sm text-green-700 bg-green-50 border border-green-100 rounded-md px-3 py-2 max-w-2xl">
          Password updated successfully.
        </p>
      )}

      <form action={changePassword} className="space-y-5 max-w-2xl">
        <FormField label="Current password" htmlFor="currentPassword">
          <PasswordInput
            id="currentPassword"
            name="currentPassword"
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </FormField>

        <FormField label="New password" htmlFor="newPassword">
          <PasswordInput
            id="newPassword"
            name="newPassword"
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClass}
          />
        </FormField>

        <FormField label="Confirm new password" htmlFor="confirmPassword">
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClass}
          />
        </FormField>

        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-foreground text-white rounded-md hover:bg-text-primary cursor-pointer"
        >
          <KeyRound size={15} strokeWidth={1.75} />
          Update Password
        </button>
      </form>
    </div>
  );
}
