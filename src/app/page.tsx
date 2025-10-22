"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Phone, CheckCircle2, Star, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BRAND = { name: "Together Finance", primary: "#0073C2", dark: "#0B0B0C" };
const PRIVACY_URL = "/legal/Together Finance - Privacy Consent Template.pdf";
const CREDIT_GUIDE_URL = "/legal/Together Finance - Credit Guide & Quote Template.pdf";

const LOGO_DATA_URL = "/images/logoS.png"; 
const HERO_IMAGE_URL = "/images/car.png";
const LOGO_FOOTER = "/images/logoF.png";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeadMeta />
      <Header />
      <Hero />
      <TrustBar />
      <LeadStrip />
      <Proof />
      <HowItWorks />
      <Calculator />
      <FAQ />
      <Footer />
      <StickyCTA />
    </div>
  );
}

function HeadMeta() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "theme-color"; meta.content = BRAND.dark; document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);
  return null;
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/70 bg-black/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_DATA_URL}
            alt="Together Finance"
            className="h-10 w-auto rounded"
          />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#proof" className="hover:text-white">
            Results
          </a>
          <a href="#process" className="hover:text-white">
            How it works
          </a>
          <a href="#calculator" className="hover:text-white">
            Calculator
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
          <a
            href="tel:+61435218466"
            className="inline-flex items-center gap-2 font-semibold text-white"
          >
            <Phone className="w-4 h-4" /> 0435 218 466
          </a>
          <a
            href="#lead"
            className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-semibold"
          >
            Get Pre-Approved <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}


  function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(1000px 400px at 10% 10%, ${BRAND.primary}55, transparent 60%), radial-gradient(800px 300px at 90% 30%, ${BRAND.primary}25, transparent 60%)`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 py-14 lg:py-24 items-center">
        {/* Testo */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight"
          >
            Fast Approvals.{" "}
            <span style={{ color: BRAND.primary }}>Real People.</span>
            <br />
            Big Dreams.
          </motion.h1>

          <p className="mt-5 text-lg text-white/80 max-w-xl">
            Car, business and personal finance made simple. Speak to a real
            consultant and get a decision fast — without the runaround.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#lead"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-semibold shadow hover:opacity-90"
            >
              Get Pre-Approved <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+61435218466"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border border-white/20"
            >
              <Phone className="w-4 h-4" /> Call 0435 218 466
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>4.9/5 average from 250+ reviews</span>
          </div>
        </div>

        {/* Immagine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black flex items-center justify-center w-full h-[40vh] sm:h-[50vh] lg:h-[80vh] aspect-[16/9]"
        >
          <img
            src={HERO_IMAGE_URL}
            alt="Hero visual"
            className="w-full h-full object-contain p-4"
          />
        </motion.div>
      </div>
    </section>
  );
}


function TrustBar() {
  return (
    <section className="py-6 border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-white/70 text-sm">
        <span>Trusted by 1,000+ drivers and business owners</span>
        <span className="w-px h-5 bg-white/10 hidden sm:block" />
        <span>Average approval time: under 24 hours</span>
        <span className="w-px h-5 bg-white/10 hidden sm:block" />
        <span>Real consultants. No call centres.</span>
      </div>
    </section>
  );
}

function LeadStrip() {
  return (
    <section id="lead" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Get your free pre-approval in minutes
          </h2>
          <p className="mt-3 text-white/70 max-w-xl">
            Tell us what you need and one of our consultants (a real human!)
            will call you to confirm options.
          </p>
          <ul className="mt-6 space-y-3 text-white/80">
            {[
              "No impact on credit score to check eligibility",
              "We compare multiple lenders for the sharpest rate",
              "Same-day approvals available",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-[var(--brand)]"
                  style={{ "--brand": BRAND.primary } as React.CSSProperties}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}



function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Car Finance",
    amount: "30000", // 👈 stringa
  });
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // validazione
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "The name is required";
    if (!form.phone.trim())
      newErrors.phone = "The telephone is required";
    else if (!/^[\d\s\+\-\(\)]{10,}$/.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

   async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  ...form,
  amount: Number(form.amount),
  page: typeof window !== "undefined" ? window.location.href : ""
})
,
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || "Send failed");
      setForm({
        name: "",
        phone: "",
        email: "",
        type: "Car Finance",
        amount: "30000",
      });
      setShowThanks(true);
      setErrors({});
    } catch (err) {
      alert("There was a problem sending. Please try again shortly.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-3xl p-6 sm:p-8 shadow-xl"
      >
        <h3 className="text-xl font-bold">Start here</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Select
            label="Finance type"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={[
              "Car Finance",
              "Business Finance",
              "Personal Loan",
              "Equipment",
            ]}
          />
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Amount</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                name="amount"
                min={5000}
                max={150000}
                step={1000}
                value={form.amount}
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-sm tabular-nums">
                ${Number(form.amount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">
            Please complete all required fields correctly.
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Get Approved"}{" "}
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="mt-3 text-xs text-black/70">
          Get your{" "}
          <a href={CREDIT_GUIDE_URL} className="underline">
            Credit Guide
          </a>{" "}
          and e-sign the{" "}
          <a href={PRIVACY_URL} className="underline">
            Privacy Consent
          </a>
          .
        </p>
        <p className="mt-3 text-xs text-black/60">
          By submitting, you agree to be contacted by Together Finance. No
          credit impact to check eligibility.
        </p>
      </form>
      {showThanks && <ThankYouOverlay onClose={() => setShowThanks(false)} />}
    </>
  );
}


// Aggiorna il componente Input per supportare gli errori
function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full rounded-xl border px-3 py-2 bg-white focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:ring-red-200"
            : "border-black/10 focus:ring-black/20"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ThankYouOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center px-6">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
          Thank you for contacting us!
        </h2>
        <p className="text-white/70 max-w-md mx-auto">
          We will contact you as soon as possible to finalize your financing
          request.
        </p>
        <button
          onClick={onClose}
          className="mt-6 bg-white text-black px-6 py-2 rounded-xl font-semibold"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
}

// --- dentro page.tsx ---


function Proof() {
  const items = [
    { title: "New family SUV approved in 6 hours", result: "$42k @ 6.29% p.a.", desc: "Young couple upgrading their car with zero hassle. Documents signed same‑day." },
    { title: "Tradie ute + tools financed", result: "$58k @ 6.49% p.a.", desc: "ABN sole trader. Approved in under 24h with only bank statements required." },
    { title: "Small business fit‑out", result: "$120k @ 7.10% p.a.", desc: "Hospitality venue expansion with staged drawdown for equipment." },
  ];
  return (
    <section id="proof" className="py-20 bg-white/5 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Real results, not theories</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 p-6 bg-black/40">
              <div className="text-sm text-white/60">{item.result}</div>
              <div className="mt-1 font-semibold text-xl">{item.title}</div>
              <p className="mt-2 text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, h: "Tell us what you need", p: "60‑second form or a quick call with a consultant." },
    { n: 2, h: "We compare lenders", p: "We find sharp rates and the best structure for your situation." },
    { n: 3, h: "Approve + settle fast", p: "Sign electronically and get moving — sometimes the same day." },
  ];
  return (
    <section id="process" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold">How it works</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl p-6 bg-white/5 border border-white/10">
              <div className="text-6xl font-extrabold text-white/10">{s.n}</div>
              <div className="mt-3 text-xl font-semibold">{s.h}</div>
              <div className="mt-2 text-white/70">{s.p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [amount, setAmount] = useState(35000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(6.5);
  const monthly = useMemo(() => {
    const n = years * 12; const r = rate / 100 / 12; if (r === 0) return amount / n; return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, years, rate]);
  return (
    <section id="calculator" className="py-20 bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Repayments calculator</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-black/10 p-6 bg-white">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <div className="mt-2 flex items-center gap-3">
                <input type="range" min={5000} max={150000} step={1000} value={amount} onChange={(e)=>setAmount(+(e.target as HTMLInputElement).value)} className="w-full"/>
                <span className="text-sm tabular-nums">${amount.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Term (years)</label>
                <select value={years} onChange={(e)=>setYears(+(e.target as HTMLSelectElement).value)} className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2">{[3,4,5,6,7].map((y)=> <option key={y} value={y}>{y}</option>)}</select>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Interest rate (p.a.)</label>
                <input type="number" step="0.05" value={rate} onChange={(e)=>setRate(+(e.target as HTMLInputElement).value)} className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"/>
              </div>
            </div>
            <p className="mt-3 text-xs text-black/60">For illustration only. Actual rates and fees depend on your situation and lender criteria.</p>
          </div>
          <div className="rounded-3xl p-6 bg-black text-white">
            <div className="text-white/70">Estimated monthly repayment</div>
            <div className="mt-2 text-5xl font-extrabold tracking-tight">${monthly.toFixed(0).toLocaleString()}</div>
            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[var(--brand)]" style={{"--brand": BRAND.primary} as React.CSSProperties}/>No obligation, no hard credit check</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[var(--brand)]" style={{"--brand": BRAND.primary} as React.CSSProperties}/>We compare multiple lenders for you</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[var(--brand)]" style={{"--brand": BRAND.primary} as React.CSSProperties}/>Talk to a real consultant today</li>
            </ul>
            <a href="#lead" className="mt-8 inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-semibold shadow hover:opacity-90">Get my exact rate <ArrowRight className="w-4 h-4"/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Will checking eligibility impact my credit score?", a: "No. We can provide an initial assessment without a hard inquiry." },
    { q: "How fast can I get approved?", a: "Same‑day approvals are common once we have your documents. Many approvals land within 24 hours." },
    { q: "What documents do I need?", a: "Typically driver licence, proof of income and bank statements. For business finance we may request ABN details and BAS statements." },
    { q: "What types of finance do you offer?", a: "Car loans, business loans, equipment finance and personal loans." },
  ];
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold">FAQs</h2>
        <div className="mt-6 divide-y divide-white/10 rounded-3xl border border-white/10 overflow-hidden">
          {faqs.map((f, i) => (
            <details key={i} className="group open:bg-white/5">
              <summary className="list-none cursor-pointer select-none p-5 flex items-center justify-between">
                <span className="font-semibold">{f.q}</span>
                <span className="transition group-open:rotate-90 text-white/60">›</span>
              </summary>
              <div className="px-5 pb-5 text-white/70">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-16 pb-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="font-extrabold tracking-tight text-xl mb-8">TOGETHER <span className="text-white/70 font-normal">FINANCE</span></div>
            <p className="mt-2 text-sm text-white/60 max-w-2xl">Together Finance Pty Ltd t/as Together Finance (ABN 84 684 830 055), Authorised Credit Representative #567196 of Fintelligence Pty Ltd (ABN 80 625 017 174), Australian Credit Licence # 511803.</p>
            <p className="mt-2 text-sm text-white/60">Address: 1/20 Baynes Street, Margate QLD 4019. Contact: <a href="tel:+61435218466" className="underline decoration-white/20 underline-offset-2">0435 218 466</a> • <a href="mailto:bella@togetherfinance.com.au" className="underline decoration-white/20 underline-offset-2">bella@togetherfinance.com.au</a></p>
          </div>
          <div className="text-sm text-white/60">
              <img src={LOGO_FOOTER} alt="Together Finance" className="h-32 w-auto object-contain mb-8 mx-auto" />
            © {new Date().getFullYear()} Together Finance. All rights reserved.
            <div className="mt-2 text-xs text-white/60 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={CREDIT_GUIDE_URL} className="underline decoration-white/20 underline-offset-2">Credit Guide & Quote (PDF)</a>
              <span className="w-[1px] h-4 bg-white/10"/>
              <a href={PRIVACY_URL} className="underline decoration-white/20 underline-offset-2">Privacy Consent (PDF)</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StickyCTA() {
  return (
    <a href="#lead" className="fixed md:hidden bottom-4 left-4 right-4 bg-white text-black py-3 rounded-2xl font-semibold text-center shadow-xl">Get Pre‑Approved</a>
  );
}
