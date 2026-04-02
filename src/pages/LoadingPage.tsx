interface LoadingPageProps {
  pendingRequests: number;
}

const LoadingPage = ({ pendingRequests }: LoadingPageProps) => {
  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="admin-shell min-h-screen bg-page">
        <div className="admin-shell-overlay relative z-10 min-h-screen">
          <div className="pointer-events-none absolute inset-x-4 top-10 h-[14rem] rounded-3xl bg-slate-950/42 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-4 top-[26rem] bottom-10 rounded-3xl bg-slate-950/36 blur-2xl md:top-[30rem]" />
          <div className="pointer-events-none absolute -top-12 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/12 blur-3xl" />
          <div className="pointer-events-none absolute left-14 top-24 h-2 w-2 rounded-full bg-amber-100 shadow-[0_0_18px_rgba(255,241,185,0.9)]" />
          <div className="pointer-events-none absolute right-16 top-40 h-1.5 w-1.5 rounded-full bg-emerald-100/90 shadow-[0_0_14px_rgba(203,255,231,0.9)]" />
          <div className="pointer-events-none absolute left-1/3 bottom-24 h-1.5 w-1.5 rounded-full bg-sky-100/90 shadow-[0_0_14px_rgba(206,240,255,0.9)]" />
          <div className="pointer-events-none absolute right-1/3 bottom-16 h-2 w-2 rounded-full bg-amber-50 shadow-[0_0_18px_rgba(255,244,204,0.95)]" />

          <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
            <section className="w-full max-w-xl rounded-3xl border border-amber-100/30 bg-slate-950/85 p-8 text-center shadow-[0_30px_80px_rgba(2,6,23,0.82)] backdrop-blur-sm md:p-10">
              <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-amber-100/80">
                Lanterns Are Lit
              </p>

              <h2 className="mt-3 font-heading text-4xl leading-tight text-amber-50 [text-shadow:0_6px_20px_rgba(8,13,28,0.8)] md:text-5xl">
                Gathering your verses from the enchanted archive...
              </h2>

              <p className="mt-4 font-body text-base text-amber-100/85 md:text-lg">
                A courier sprite is crossing the moonlit woods to fetch your page.
              </p>

              <div className="mx-auto mt-7 h-3 w-full max-w-sm overflow-hidden rounded-full border border-amber-100/25 bg-slate-900/70">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-amber-300/75 via-amber-100 to-emerald-200/75" />
              </div>

              <p className="mt-4 font-ui text-xs uppercase tracking-[0.14em] text-amber-100/70">
                {pendingRequests} network request{pendingRequests === 1 ? "" : "s"} in progress
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
