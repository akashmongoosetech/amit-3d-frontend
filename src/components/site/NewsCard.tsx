import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/site/Tilt";

export function NewsCard({ article, className }: { article: Article; className?: string }) {
  return (
    <Link to="/news/$slug" params={{ slug: article.slug }} className={cn("group block", className)}>
      <Tilt className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-card shadow-lg shadow-transparent transition-shadow duration-500 group-hover:shadow-accent/10">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          decoding="async"
          width={1200}
          height={800}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="glass-panel pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1 text-xs">
          {article.category}
        </span>
      </Tilt>
      <div className="mt-4">
        <p className="text-xs text-muted-foreground">
          {article.date} · {article.readTime}
        </p>
        <h3 className="heading-display mt-2 text-xl transition-colors duration-300 group-hover:text-accent">
          {article.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{article.excerpt}</p>
      </div>
    </Link>
  );
}
