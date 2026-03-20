'use client'

import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { ConstellationMap } from "../components/Constellationmap";
import Image from "next/image";




const About = () => {
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">

        <div className="relative flex flex-col justify-end overflow-hidden grid-default-color grid-1 min-h-[20rem] md:min-h-0">

          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(ellipse at 80% 20%, rgba(92,51,204,0.22) 0%, transparent 55%)," +
                "radial-gradient(ellipse at 10% 80%, rgba(56,189,248,0.14) 0%, transparent 50%)," +
                "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 70%)",
            }}
          />

          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-60" xmlns="http://www.w3.org/2000/svg">
            {[
              [12, 8], [88, 15], [24, 42], [72, 28], [45, 60], [91, 72], [8, 85], [60, 18],
              [35, 76], [80, 55], [18, 32], [95, 40], [52, 88], [28, 12], [68, 90],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r={i % 3 === 0 ? "1.2" : "0.7"} fill="white" opacity={i % 4 === 0 ? "0.5" : "0.25"} />
            ))}
          </svg>

        <Image
            src="/assets/nasa-unsplash.webp"
            alt="Nebula background"
            width={400}
            height={400}
            className="absolute z-0 object-cover opacity-30 md:opacity-60 inset-0 w-full h-full md:w-auto md:h-auto md:inset-auto md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] md:-right-[5rem] md:-top-[1rem]"
            priority
          />

          <div
            className="absolute inset-x-0 bottom-0 z-[1] pointer-events-none h-full md:h-3/4"
            style={{
              background: "linear-gradient(to top, rgba(13,10,35,0.98) 0%, rgba(13,10,35,0.88) 40%, rgba(13,10,35,0.40) 75%, transparent 100%)",
            }}
          />

          <div className="relative z-10 space-y-3 p-4 pb-4 md:p-1 md:pb-2">

            <p className="headtext leading-tight">
              I&apos;m Irgi Adit Pratama
            </p>

            <p className="subtext leading-relaxed text-white">
              Software Engineer specializing in scalable systems and database architecture,
              built to last years, not just the next sprint.
            </p>

            <div className="w-full h-px bg-gradient-to-r from-violet-500/40 via-sky-400/30 to-transparent" />

            <div className="flex items-start gap-2.5">
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-b from-violet-400 to-sky-400 shrink-0" />
              <p className="text-[11px] leading-relaxed text-white">
                <span className="font-semibold">Founder of SolvinMe</span>
                {" — "}solving the first real problem of early startups: building credible
                presence and solid infrastructure fast. Engineering problems that hold
                companies back from day zero.
              </p>
            </div>

          </div>
        </div>



        {/* Grid 2 */}
        <div
          className="grid-default-color grid-2 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #07091e 0%, #0f1228 50%, #181b35 100%)",
            padding: 0,
          }}
        >
          <ConstellationMap className="w-full h-full" />
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              I&apos;m based in Mars, and open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools that
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;