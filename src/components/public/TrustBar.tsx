export function TrustBar({ years = 15 }: { years?: number }) {
  return (
    <section className="w-full bg-surface-container-lowest border-t border-on-surface/5 py-section-gap">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-8 md:gap-12">
          <span className="font-display-xl text-display-xl text-tertiary tabular-nums tracking-tighter leading-none">
            {years}
          </span>
          <h2 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-background tracking-tight uppercase">
            TAHUN BERKARYA
          </h2>
        </div>
      </div>
    </section>
  );
}
