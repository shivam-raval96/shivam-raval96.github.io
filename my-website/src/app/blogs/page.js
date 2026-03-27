import Link from "next/link";
import { blogs } from "../data";

export default function Blogs() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          Writing
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Essays, explorables, and research write-ups.
        </p>
      </div>

      {blogs.map((post) => (
        <Link
          key={post.id}
          href={post.external ? post.link : `/blogs/${post.id}`}
          target={post.external ? "_blank" : undefined}
          rel={post.external ? "noopener noreferrer" : undefined}
          className="card card-hover flex flex-col gap-3 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-sm font-semibold leading-snug" style={{ color: "var(--text)" }}>
              {post.title}
            </h2>
            <span className="text-xs shrink-0" style={{ color: "var(--muted)" }}>
              {post.readTime}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
            {post.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {post.date}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
