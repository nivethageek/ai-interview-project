import { auth } from "@clerk/nextjs/server";
import {
  ArrowDownRight,
  ArrowRight,
  AudioLines,
  BrainCircuit,
  Check,
  ChevronRight,
  CirclePlay,
  Mic2,
  Sparkles,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const benefits = [
  {
    icon: BrainCircuit,
    title: "Questions that feel real",
    description:
      "Practice with role-specific questions shaped around the skills employers care about.",
  },
  {
    icon: AudioLines,
    title: "Speak with confidence",
    description:
      "Get comfortable thinking out loud and explaining your decisions clearly.",
  },
  {
    icon: Target,
    title: "Know what to improve",
    description:
      "Review your answers and turn every practice session into a focused next step.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaff] text-[#181629]">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Prepwise home"
        >
          <Image src="/logo.svg" width={25} height={34} alt="" priority />
          <span className="text-xl font-bold tracking-tight">prepwise</span>
        </Link>
        <nav className="hidden items-center gap-9 text-sm font-medium text-[#68667a] md:flex">
          <a href="#how-it-works" className="transition hover:text-[#5236d8]">
            How it works
          </a>
          <a href="#why-prepwise" className="transition hover:text-[#5236d8]">
            Why Prepwise
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-[#39364f] transition hover:bg-white sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-[#573be3] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(87,59,227,0.2)] transition hover:-translate-y-0.5 hover:bg-[#4930ca]"
          >
            Get started <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-28 lg:pt-16">
        <div className="pointer-events-none absolute -left-40 top-12 -z-0 h-80 w-80 rounded-full bg-[#ded6ff]/60 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#e7e1ff] bg-white/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-[#634bd3] shadow-sm">
            <Sparkles size={14} aria-hidden="true" />
            YOUR NEXT OPPORTUNITY STARTS HERE
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-[4.35rem]">
            The interview is yours to{" "}
            <span className="relative inline-block text-[#5b3fe0]">
              ace.
              <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full rounded-full bg-[#e6dfff]" />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#6c697e] sm:text-lg sm:leading-8">
            Show up ready for the conversation that could change everything.
            Practice realistic interviews with your AI coach and build
            confidence one answer at a time.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#573be3] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(87,59,227,0.24)] transition hover:-translate-y-0.5 hover:bg-[#4930ca]"
            >
              Start practicing free <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-[#e8e5f1] bg-white px-6 py-3.5 text-sm font-semibold text-[#39364f] transition hover:border-[#d5cdf9] hover:bg-[#faf9ff]"
            >
              <CirclePlay
                size={18}
                className="text-[#684ee4]"
                aria-hidden="true"
              />
              See how it works
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#777487]">
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-[#34a983]" aria-hidden="true" />
              Personalized practice
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-[#34a983]" aria-hidden="true" />
              Go at your own pace
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-4 -top-7 h-24 w-24 rounded-full border border-[#eeeaff] bg-white/80" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#e8e3ff] blur-2xl" />
          <div className="relative rounded-[2rem] border border-white bg-white p-3 shadow-[0_30px_90px_rgba(53,42,110,0.14)] sm:p-5">
            <div className="rounded-[1.4rem] bg-[#f7f5ff] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b87a0]">
                    Your practice space
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold tracking-tight">
                    Let&apos;s get you ready
                  </h2>
                </div>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-[#6549e0] shadow-sm">
                  <Sparkles size={20} aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[#eeebf7] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#88859a]">
                      UP NEXT
                    </p>
                    <p className="mt-1.5 font-semibold">Frontend Developer</p>
                    <p className="mt-1 text-sm text-[#88859a]">
                      React · JavaScript · 30 min
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#f0edff] p-2.5 text-[#6044dc]">
                    <Mic2 size={19} aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#f0eef6] pt-4">
                  <span className="text-xs font-medium text-[#858196]">
                    Ready when you are
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#5b3fe0]">
                    Start session <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#eeebf7] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#858196]">
                      Confidence
                    </span>
                    <ArrowDownRight
                      size={15}
                      className="text-[#36a984]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    Growing
                  </p>
                  <div
                    className="mt-3 flex h-7 items-end gap-1.5"
                    aria-label="Confidence progress"
                  >
                    {[12, 18, 14, 23, 19, 28, 25, 34, 30, 39].map(
                      (height, index) => (
                        <span
                          key={index}
                          className={`w-full rounded-t-sm ${index === 9 ? "bg-[#684ce6]" : "bg-[#dcd5fb]"}`}
                          style={{ height: `${height}px` }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-[#5b3fe0] p-4 text-white">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-white/15">
                    <AudioLines size={17} aria-hidden="true" />
                  </div>
                  <div className="mt-5">
                    <p className="text-xs text-white/70">
                      A little practice goes a long way
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      You&apos;ve got this.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 right-4 hidden items-center gap-3 rounded-2xl border border-[#eeebf7] bg-white px-4 py-3 shadow-[0_12px_32px_rgba(53,42,110,0.12)] sm:flex">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#edfaf5] text-[#31a781]">
              <Check size={18} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold">One answer at a time</p>
              <p className="mt-0.5 text-[11px] text-[#858196]">
                Progress that feels like yours
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-[#eeebf5] bg-white/70"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#684ce6]">
              A better way to prepare
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Practice with purpose. Walk in ready.
            </h2>
            <p className="mt-4 leading-7 text-[#777487]">
              The best interviews don&apos;t happen by accident. Build your
              confidence in a space made for trying, learning, and trying again.
            </p>
          </div>
          <div id="why-prepwise" className="mt-12 grid gap-4 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-[#eeebf5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(53,42,110,0.08)]"
              >
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#f0edff] text-[#6246df]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#9995a9]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#777487]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="Prepwise home"
        >
          <Image src="/logo.svg" width={20} height={27} alt="" />
          <span className="font-bold tracking-tight">prepwise</span>
        </Link>
        <p className="text-sm text-[#858196]">
          A calmer way to get ready for what&apos;s next.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5b3fe0] transition hover:gap-3"
        >
          Start your first practice <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
