import Link from "next/link";
import Icons from "~/common/icons/icons";
import { getAllBlogMeta } from "~/common/lib/mdx";



export default function RecentBlogsSection() {
  const blogs = getAllBlogMeta();


  const recentBlogs = blogs
    .sort((a, b) => {
      if (a.frontMatter.date && b.frontMatter.date) {
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
      }
      return 0;
    })
    .slice(0, 3);


  return (
    <>
      <section className="mt-28 px-4 sm:px-6 mb-40">
        <div className="badge px-3 py-1.5 rounded-md font-semibold text-sm">
          Recent Blogs ✍️
        </div>
        <h1 className="text-accent-1/40 text-2xl sm:text-5xl font-black mt-1">Fresh From the Blog</h1>

        <div className="mt-6">
          {recentBlogs.length !== 0 && (
            <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
              {recentBlogs.map((blog) => (
                <article
                  key={blog.slug}
                  className="group bg-primary-2 hover:bg-primary-1 border border-primary-3 hover:border-success/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-3/20 hover:-translate-y-1"
                >
                  <Link href={`/blogs/${blog.slug}`} className="block">
                    <div className="flex items-center gap-2 mb-4 text-sm font-geist-mono">
                      {blog.frontMatter.date && (
                        <time className="text-success font-medium">
                          {new Date(blog.frontMatter.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      )}
                      {blog.frontMatter.readingTime && (
                        <>
                          <span className="text-primary-4">•</span>
                          <span className="text-accent-1/70">
                            {blog.frontMatter.readingTime}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-calistoga text-accent-3 mb-3 leading-tight group-hover:text-success transition-colors duration-300 line-clamp-2">
                      {blog.frontMatter.title}
                    </h3>

                    {blog.frontMatter.description && (
                      <p className="text-accent-1/80 leading-relaxed mb-4 line-clamp-3 text-sm md:text-base">
                        {blog.frontMatter.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-success font-medium text-sm">
                      <span>Read article</span>
                      <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 mt-0.5" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link
              href="/blogs"
              className="button-1 inline-flex items-center justify-center px-6 py-3"
            >
              <span>View All Blogs</span>
              <Icons.ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
