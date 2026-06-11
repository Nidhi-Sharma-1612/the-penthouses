"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentResultContent() {
  const params = useSearchParams();
  const isSuccess = params.get("status") === "success";
  const quoteId = params.get("quoteId");

  return (
    <div style={{ backgroundColor: "#ffffff" }} className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center py-20 border border-gray-100 px-8 max-w-md">
        <p className="text-[10px] tracking-[0.2em] text-[#C6A355] mb-3 font-body">
          {isSuccess ? "PAYMENT AUTHENTICATED" : "AUTHENTICATION FAILED"}
        </p>
        <h1
          className="font-heading text-4xl mb-3"
          style={{ fontWeight: 400, color: "rgb(17, 17, 17)" }}
        >
          {isSuccess ? "Thank You" : "Payment Not Completed"}
        </h1>
        <p className="text-sm text-muted-foreground font-light font-body max-w-sm mx-auto mb-6">
          {isSuccess
            ? "Your card was successfully verified. We're finalizing your reservation now and a confirmation email will arrive shortly. If you don't receive one within 15 minutes, please contact us with the reference below."
            : "We couldn't verify your card for this booking and you have not been charged. Please return to booking and try again, or use a different card."}
        </p>

        {quoteId && (
          <div className="inline-block border border-gray-200 bg-gray-50 px-6 py-4 mb-6">
            <p className="text-[9px] tracking-[0.15em] text-muted-foreground font-body mb-1.5">
              REFERENCE
            </p>
            <p className="font-mono text-sm text-foreground tracking-wide select-all">{quoteId}</p>
          </div>
        )}

        <div>
          <Link
            href={isSuccess ? "/" : "/book"}
            className="inline-block bg-foreground text-white text-[11px] tracking-[0.2em] px-8 py-4 hover:bg-gray-800 transition-colors font-body"
          >
            {isSuccess ? "RETURN HOME" : "BACK TO BOOKING"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultContent />
    </Suspense>
  );
}
