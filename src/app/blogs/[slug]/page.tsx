import { notFound } from "next/navigation";
import { getBlogBySlug } from "~/common/lib/mdx";
import Link from "next/link";
import Icons from "~/common/icons/icons";

export async function generateStaticParams() {
  const { getAllBlogSlugs } = await import("~/common/lib/mdx");
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}



export default async function BlogPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params;

  try {
    const { content, frontMatter } = await getBlogBySlug(slug);

    if (!content || !frontMatter || !frontMatter.title) {
      notFound();
    }


    return (
      <div className="min-h-screen bg-primary-1 text-accent-2 font-lexend">
        <nav className="sticky top-0 z-10 bg-primary-1/90 backdrop-blur-md border-b border-primary-3 px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-accent-1 hover:text-accent-3 transition-colors duration-200 text-sm font-medium group"
            >
              <Icons.ChevronLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Blog
            </Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6 text-sm font-geist-mono">
              <time className="text-success font-medium">
                {frontMatter.date}
              </time>
              {frontMatter.readingTime && (
                <>
                  <span className="text-primary-4">•</span>
                  <span className="text-accent-1">
                    {frontMatter.readingTime}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-calistoga text-accent-3 mb-6 leading-tight tracking-tight">
              {frontMatter.title}
            </h1>

            {frontMatter.description && (
              <p className="text-lg md:text-xl text-accent-1 max-w-2xl mx-auto leading-relaxed">
                {frontMatter.description}
              </p>
            )}

            <div className="w-24 h-1 bg-gradient-to-r from-success to-primary-4 mx-auto mt-8 rounded-full"></div>
          </header>

          <article className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-16">
            <div className="bg-primary-2 rounded-2xl p-6 md:p-8 lg:p-10 border border-primary-3">
              {content}
            </div>
          </article>

          <footer className="border-t border-primary-3 pt-8">
            <Link
              href="/blogs"
              className="group flex items-center gap-4 p-6 bg-primary-2 hover:bg-primary-3 border border-primary-3 hover:border-primary-4 rounded-xl transition-all duration-300 max-w-md"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary-3 group-hover:bg-success rounded-full flex items-center justify-center transition-colors duration-300">
                <Icons.ChevronLeft className="text-accent-2 group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              <div>
                <div className="font-semibold text-accent-3 group-hover:text-accent-3 transition-colors duration-300">
                  Back to Blog
                </div>
                <div className="text-sm text-accent-1 group-hover:text-accent-2 transition-colors duration-300">
                  View all posts
                </div>
              </div>
            </Link>
          </footer>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog page for slug:", slug, error);
    notFound();
  }
}
