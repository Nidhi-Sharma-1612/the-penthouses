"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { Lock } from "lucide-react";

export interface CardFormHandle {
  tokenize(listingId: string, guestName: string): Promise<string>;
}

function fmtCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function fmtExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

const CardForm = forwardRef<CardFormHandle>(function CardForm(_, ref) {
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardError, setCardError] = useState("");

  useImperativeHandle(ref, () => ({
    async tokenize(listingId: string, guestName: string): Promise<string> {
      setCardError("");

      const [expMonth, expYear] = expiry.split("/");
      if (!number.trim() || !expMonth || !expYear || !cvc.trim()) {
        const msg = "Please fill in all card details.";
        setCardError(msg);
        throw new Error(msg);
      }

      let res: Response;
      try {
        res = await fetch("/api/tokenize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            card: {
              number: number.replace(/\s/g, ""),
              exp_month: parseInt(expMonth, 10),
              exp_year: parseInt("20" + expYear, 10),
              cvc,
            },
            billing_details: { name: guestName },
            listingId,
          }),
        });
      } catch {
        const msg = "Unable to process payment. Please check your connection and try again.";
        setCardError(msg);
        throw new Error(msg);
      }

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data?.error?.message ?? data?.message ?? "Your card was declined. Please try a different card.";
        setCardError(msg);
        throw new Error(msg);
      }

      // 3DS required — redirect; booking resumes after guest completes authentication
      if (data.authURL) {
        window.location.href = data.authURL;
        throw new Error("3DS_REDIRECT");
      }

      const tokenId = data.token_id ?? data.tokenId ?? data.PaymentToken ?? data.paymentToken;
      if (!tokenId) {
        const msg = "Payment processor did not return a token. Please try again.";
        setCardError(msg);
        throw new Error(msg);
      }

      return tokenId as string;
    },
  }));

  const inputCls =
    "w-full border border-gray-300 px-3 py-2.5 text-sm font-body placeholder:text-gray-400 focus:outline-none focus:border-foreground";

  return (
    <div className="border-t border-gray-100 pt-3">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">PAYMENT DETAILS</p>
        <div className="flex items-center gap-1.5">
          <Lock width={10} height={10} className="text-[#C6A355]" />
          <span className="text-[9px] text-muted-foreground font-body">Secured by GuestyPay</span>
        </div>
      </div>

      <div className="space-y-3">
        <input
          placeholder="Card number"
          value={number}
          inputMode="numeric"
          autoComplete="cc-number"
          onChange={(e) => setNumber(fmtCard(e.target.value))}
          className={inputCls}
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="MM / YY"
            value={expiry}
            inputMode="numeric"
            autoComplete="cc-exp"
            onChange={(e) => setExpiry(fmtExpiry(e.target.value))}
            className={inputCls}
          />
          <input
            placeholder="CVC"
            value={cvc}
            inputMode="numeric"
            autoComplete="cc-csc"
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className={inputCls}
          />
        </div>

        {cardError && (
          <p className="text-xs text-red-600 font-body">{cardError}</p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-3">
        {["VISA", "MC", "AMEX", "DISC"].map((brand) => (
          <span
            key={brand}
            className="text-[8px] tracking-wider text-muted-foreground border border-gray-200 px-1.5 py-0.5 font-body"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
});

export default CardForm;
