export default function Home() {
  const core = ["Next.js", "React", "TypeScript", "TailwindCSS"];
  const ui = ["shadcn/ui", "Radix Primitives", "lucide-react"];
  const dataViz = ["ECharts", "Recharts"];
  const scheduling = ["FullCalendar"];

  const Tag = ({ label }: { label: string }) => (
    <span className="inline-block text-xs bg-white text-gray-800 border border-gray-300 rounded-full px-2 py-1 mr-2 mb-2">
      {label}
    </span>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-2xl bg-gray-50/80 border border-gray-300 rounded-md p-6 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Ali Reza Torabi
          </h1>
          <p className="text-sm text-gray-700">
            Data Scientist & Fullstack Developer
          </p>
          <a
            href="https://www.alirezatorabidev.ir/"
            className="text-sm text-blue-600 hover:underline"
          >
            www.alirezatorabidev.ir
          </a>
        </header>

        <section className="mb-2 flex gap-2 items-center">
          <h3 className="text-sm text-gray-800 font-semibold mb-2">Core</h3>
          <div>
            {core.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </section>

        <section className="mb-2 flex gap-2 items-center">
          <h3 className="text-sm text-gray-800 font-semibold mb-2">UI</h3>
          <div>
            {ui.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </section>

        <section className="mb-2 flex gap-2 items-center">
          <h3 className="text-sm text-gray-800 font-semibold mb-2">Data Viz</h3>
          <div>
            {dataViz.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </section>

        <section className="mb-2 flex gap-2 items-center">
          <h3 className="text-sm text-gray-800 font-semibold mb-2">
            Scheduling
          </h3>
          <div>
            {scheduling.map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
