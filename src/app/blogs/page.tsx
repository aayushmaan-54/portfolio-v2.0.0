import Link from "next/link";
import Icons from "~/common/icons/icons";
import { getAllBlogMeta } from "~/common/lib/mdx";



export default function BlogsPage() {
  const blogs = getAllBlogMeta();

  const sortedBlogs = blogs.sort((a, b) => {
    if (a.frontMatter.date && b.frontMatter.date) {
      return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
    }
    return 0;
  });


  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="min-h-screen bg-primary-1 text-accent-2 font-lexend">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-accent-3 leading-tight tracking-tight font-calistoga">
                Blogs
              </h1>
              <h3 className="text-accent-1/40 text-xl font-black mt-1">
                Thoughts & Insights
              </h3>
            </div>

          </div>

          <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            {sortedBlogs.length !== 0 && (
              <div className="grid gap-8 md:gap-10 lg:gap-12">
                {sortedBlogs.map((blog, index) => (
                  <article
                    key={blog.slug}
                    className="group relative bg-primary-2 hover:bg-primary-1 border border-primary-3 hover:border-primary-4 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary-3/20"
                  >
                    <Link href={`/blogs/${blog.slug}`} className="block">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4 text-sm font-geist-mono">
                            {blog.frontMatter.date && (
                              <time className="text-success font-medium">
                                {new Date(blog.frontMatter.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </time>
                            )}
                            {blog.frontMatter.readingTime && (
                              <>
                                <span className="text-primary-4">•</span>
                                <span className="text-accent-1">
                                  {blog.frontMatter.readingTime}
                                </span>
                              </>
                            )}
                          </div>

                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[var(--font-calistoga)] text-accent-3 mb-4 leading-tight tracking-tight group-hover:text-success transition-colors duration-300">
                            {blog.frontMatter.title}
                          </h2>

                          {blog.frontMatter.description && (
                            <p className="text-base md:text-lg text-accent-1 leading-relaxed mb-6 line-clamp-3">
                              {blog.frontMatter.description}
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-success group-hover:text-success font-medium">
                            <span>Read more</span>
                            <Icons.ArrowRight className="size-4 mt-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            {sortedBlogs.length > 0 && sortedBlogs.length >= 10 && (
              <div className="text-center mt-16">
                <button className="group inline-flex items-center gap-3 px-8 py-4 bg-primary-2 hover:bg-success text-accent-2 hover:text-primary-1 border border-primary-3 hover:border-success rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-success/20">
                  <span>Load More Posts</span>
                  <Icons.ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
