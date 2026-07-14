import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { articles } from "@/lib/data";
import { Reveal, StaggerText } from "@/components/site/Reveal";
import { NewsCard } from "@/components/site/NewsCard";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — Verto3D" }, { name: "robots", content: "noindex" }],
      };
    }
    const { article } = loaderData;
    const url = `/news/${params.slug}`;
    return {
      meta: [
        { title: `${article.title} — Verto3D Insights` },
        { name: "description", content: article.excerpt },
        { name: "keywords", content: article.keywords.join(", ") },
        { name: "author", content: article.author },
        { property: "og:title", content: `${article.title} — Verto3D Insights` },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: article.image },
        { property: "article:published_time", content: article.publishedAt },
        { property: "article:modified_time", content: article.modifiedAt },
        { property: "article:author", content: article.author },
        { property: "article:section", content: article.category },
        { name: "twitter:image", content: article.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": article.category.toLowerCase().includes("news") ? "NewsArticle" : "Article",
            headline: article.title,
            description: article.excerpt,
            image: [article.image],
            datePublished: article.publishedAt,
            dateModified: article.modifiedAt,
            author: {
              "@type": "Person",
              name: article.author,
              jobTitle: article.role,
            },
            publisher: {
              "@type": "Organization",
              name: "Verto3D",
              logo: { "@type": "ImageObject", url: "/favicon.ico" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            url,
            keywords: article.keywords.join(", "),
            articleSection: article.category,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "News", item: "/news" },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          }),
        },
      ],
    };
  },

  notFoundComponent: ArticleNotFound,
  component: ArticlePage,
});

function ArticleNotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center pt-32 text-center">
      <h1 className="heading-display text-4xl">Article not found</h1>
      <Link
        to="/news"
        className="btn-pill mt-6 border border-border px-6 py-3 text-sm hover:border-foreground"
      >
        <ArrowLeft className="size-4" /> All news
      </Link>
    </div>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div>
      <section className="container-site pt-40 md:pt-48">
        <Reveal>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All news
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1">{article.category}</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </Reveal>
        <h1 className="heading-display mt-6 max-w-4xl text-4xl md:text-6xl">
          <StaggerText text={article.title} />
        </h1>
        <Reveal delay={0.2}>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-full border border-border bg-secondary">
              <span className="heading-display text-sm text-accent">
                {article.author
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{article.author}</p>
              <p className="text-xs text-muted-foreground">{article.role}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal className="container-site py-12 md:py-16">
        <div className="overflow-hidden rounded-[2rem]">
          <img
            src={article.image}
            alt={`${article.title} — feature image for Verto3D article`}
            width={1280}
            height={853}
            className="aspect-[2/1] w-full object-cover"
          />
        </div>
      </Reveal>

      <section className="container-site pb-16 md:pb-24">
        <div className="mx-auto max-w-2xl space-y-7">
          {article.body.map((para: string, i: number) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-base leading-relaxed text-foreground/85 md:text-lg">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="heading-display text-3xl md:text-4xl">
              Related <span className="serif-accent text-accent">articles</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <NewsCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
