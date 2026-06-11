"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";
import { Lock } from "lucide-react";

interface TokenizationSubmitPayload {
  amount: number;
  currency: string;
  listingId: string;
  quoteId: string;
  guest: { firstName: string; lastName: string; email?: string; phone?: string };
  threeDS?: {
    amount: number;
    currency: string;
    successURL: string;
    failureURL: string;
  };
}

declare global {
  interface Window {
    guestyTokenization?: {
      render(options: {
        containerId: string;
        providerId: string;
        onStatusChange?: (isValid: boolean) => void;
      }): Promise<void>;
      validate(): void;
      submit(payload: TokenizationSubmitPayload): Promise<Record<string, unknown>>;
      destroy(): void;
    };
  }
}

export interface GuestyPaymentFormHandle {
  submit(payload: TokenizationSubmitPayload): Promise<string>;
}

interface Props {
  providerId: string;
  containerId: string;
}

const GuestyPaymentForm = forwardRef<GuestyPaymentFormHandle, Props>(function GuestyPaymentForm(
  { providerId, containerId },
  ref
) {
  const [scriptReady, setScriptReady] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [error, setError] = useState("");
  const renderedRef = useRef(false);

  useEffect(() => {
    if (window.guestyTokenization) setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!scriptReady || renderedRef.current || !window.guestyTokenization || !providerId) return;
    renderedRef.current = true;
    window.guestyTokenization
      .render({ containerId, providerId })
      .then(() => setFormReady(true))
      .catch(() => setError("Unable to load the payment form. Please refresh and try again."));
  }, [scriptReady, containerId, providerId]);

  useEffect(() => {
    return () => {
      window.guestyTokenization?.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    async submit(payload) {
      if (!window.guestyTokenization || !formReady) {
        throw new Error("Payment form is not ready. Please try again.");
      }

      let result: Record<string, unknown>;
      try {
        result = await window.guestyTokenization.submit(payload);
      } catch (err) {
        const data = (err as { response?: { data?: unknown } })?.response?.data as
          | { message?: string; error?: { ProcessorResult?: { ResponseDescription?: string } } }
          | undefined;
        if (data) console.error("GuestyPay decline:", data);
        throw new Error("Your card could not be processed. Please try a different card.");
      }

      // 3DS required — redirect; booking resumes after guest completes authentication
      const threeDS = result.threeDS as { authURL?: string } | undefined;
      if (threeDS?.authURL) {
        window.location.href = threeDS.authURL;
        throw new Error("3DS_REDIRECT");
      }

      const ccToken = (result._id ?? result.id ?? result.token_id) as string | undefined;
      if (!ccToken) {
        throw new Error("Payment processor did not return a token. Please try again.");
      }

      return ccToken;
    },
  }));

  return (
    <div className="border-t border-gray-100 pt-3">
      <Script
        src="https://pay.guesty.com/tokenization/v2/init.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />

      <div className="flex items-center justify-between mb-3">
        <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body">PAYMENT DETAILS</p>
        <div className="flex items-center gap-1.5">
          <Lock width={10} height={10} className="text-[#C6A355]" />
          <span className="text-[9px] text-muted-foreground font-body">Secured by GuestyPay</span>
        </div>
      </div>

      {!providerId && (
        <p className="text-xs text-red-600 font-body">
          Payment is not configured yet. Please contact us to complete this booking.
        </p>
      )}

      {providerId && !formReady && !error && (
        <div className="text-xs text-muted-foreground font-body py-4 text-center">
          Loading secure payment form…
        </div>
      )}

      <div id={containerId} />

      {error && <p className="text-xs text-red-600 font-body mt-2">{error}</p>}
    </div>
  );
});

export default GuestyPaymentForm;
