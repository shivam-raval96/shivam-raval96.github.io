import Link from "next/link";
import { visuals } from "../data";

export default function Visuals() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          Visuals
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Interactive visualizations and generative experiments.
        </p>
      </div>

      {visuals.map((item) => (
        <Link
          key={item.id}
          href={`/visuals/${item.id}`}
          className="card card-hover flex flex-col gap-3 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              {item.title}
            </h2>
            <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
              {item.date}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
