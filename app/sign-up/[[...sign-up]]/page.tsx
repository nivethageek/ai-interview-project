import { SignUp } from "@clerk/nextjs";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Check,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fbfaff] text-[#181629] lg:grid lg:grid-cols-[1fr_1fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#241747] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="pointer-events-none absolute -left-36 top-36 size-[28rem] rounded-full bg-[#7549eb]/35 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-48 right-[-8rem] size-[34rem] rounded-full bg-[#4433a5]/50 blur-[110px]" />

        <Link
          href="/"
          className="relative z-10 inline-flex w-fit items-center gap-3"
          aria-label="Prepwise home"
        >
          <Image src="/logo.svg" width={25} height={34} alt="" priority />
          <span className="text-xl font-bold tracking-tight">prepwise</span>
        </Link>

        <div className="relative z-10 mx-auto w-full max-w-xl py-16">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-medium text-[#d8ceff]">
            <Sparkles size={14} aria-hidden="true" />A LITTLE PRACTICE. A LOT
            MORE CONFIDENCE.
          </div>
          <h1 className="max-w-lg text-5xl font-semibold leading-[1.08] tracking-[-0.05em] xl:text-6xl">
            Your next big thing starts with{" "}
            <span className="text-[#b9a7ff]">one conversation.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/65">
            Make space to practice, find your words, and walk into every
            interview feeling more like yourself.
          </p>

          <div className="mt-12 max-w-md rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#765be8]/25 text-[#c8bbff]">
                <AudioLines size={19} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Your own AI interview coach
                </p>
                <p className="mt-0.5 text-xs text-white/55">
                  Practice at your pace, on your terms
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-white/65">
              <Check size={15} className="text-[#9ce4c2]" aria-hidden="true" />
              Personalized questions for the role you want
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          A calmer way to get ready for what's next.
        </p>
      </section>

      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between lg:justify-end">
          <Link
            href="/"
            className="inline-flex items-center gap-2 lg:hidden"
            aria-label="Prepwise home"
          >
            <Image src="/logo.svg" width={21} height={29} alt="" priority />
            <span className="text-lg font-bold tracking-tight">prepwise</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#777487] transition hover:bg-white hover:text-[#5236d8]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-7">
              <p className="text-sm font-semibold text-[#684ce6]">
                Your next chapter starts here
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Create your account
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#777487]">
                A few details, then you&apos;re on your way to feeling
                interview-ready.
              </p>
            </div>

            <Suspense>
              <SignUp
                forceRedirectUrl="/dashboard"
                appearance={{
                  variables: {
                    colorPrimary: "#573be3",
                    colorBackground: "#ffffff",
                    borderRadius: "0.75rem",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                  },
                  elements: {
                    rootBox: "w-full",
                    cardBox: "w-full shadow-none",
                    card: "w-full gap-5 rounded-2xl border border-[#eeebf5] bg-white p-5 shadow-[0_16px_50px_rgba(53,42,110,0.07)] sm:p-7",
                    header: "hidden",
                    socialButtonsBlockButton:
                      "h-11 border-[#e8e5f1] font-medium shadow-none transition hover:bg-[#faf9ff]",
                    socialButtonsBlockButtonText: "font-medium",
                    dividerLine: "bg-[#eeebf5]",
                    dividerText: "text-[#9995a9]",
                    formFieldLabel: "font-medium text-[#39364f]",
                    formFieldInput:
                      "h-11 border-[#e8e5f1] shadow-none focus:border-[#9b87f4] focus:ring-2 focus:ring-[#684ce6]/15",
                    formButtonPrimary:
                      "h-11 bg-[#573be3] font-semibold shadow-[0_8px_20px_rgba(87,59,227,0.18)] transition hover:bg-[#4930ca]",
                    footer: "hidden",
                  },
                }}
              />
            </Suspense>

            <p className="mt-6 text-center text-xs leading-5 text-[#9995a9]">
              Your information stays private and secure. You can update your
              account details anytime.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 pb-2 text-sm text-[#858196]">
          Already have an account?
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-1 font-semibold text-[#5b3fe0] hover:text-[#4930ca]"
          >
            Sign in <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
