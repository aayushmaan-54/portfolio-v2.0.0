/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogFrontMatter } from '../types/types';
import rehypePrettyCode from 'rehype-pretty-code';
import { compileMDX } from 'next-mdx-remote/rsc';
import MDXComponents from '../components/mdx-components';


const BLOG_DIR = path.join(process.cwd(), 'src/content/blogs');

export async function getBlogBySlug(slug: string) {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const rawFile = fs.readFileSync(filePath, 'utf8');

    const { content, frontmatter } = await compileMDX<{
      title: string;
      description?: string;
      date: string;
      readingTime?: string;
    }>({
      source: rawFile,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                // vitesse-dark, vitesse-black, min-dark, gruvbox-dark-hard, kanagawa-dragon, everforest-dark
                theme: 'min-dark',
                keepBackground: true,
                onVisitLine(node: any) {
                  if (node.children.length === 0) {
                    node.children = [{ type: 'text', value: ' ' }];
                  }
                },
                onVisitHighlightedLine(node: any) {
                  node.properties.className = ['highlighted'];
                },
                onVisitHighlightedWord(node: any) {
                  node.properties.className = ['word'];
                },
              },
            ],
          ],
        },
      },
      components: MDXComponents,
    });

    return {
      content,
      frontMatter: frontmatter as BlogFrontMatter,
    };
  } catch (error) {
    console.error(`Error processing MDX for slug ${slug}:`, error);
    throw error;
  }
}

export function getAllBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_DIR);
    const slugs = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
    return slugs;
  } catch (error) {
    console.error('Error reading blog directory for slugs:', error);
    throw error;
  }
}

export function getAllBlogMeta() {
  const slugs = getAllBlogSlugs();

  const allBlogsMeta = slugs.map((slug) => {
    try {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      const rawFile = fs.readFileSync(filePath, 'utf8');

      const { data: frontMatter } = matter(rawFile);
      return {
        slug,
        frontMatter: frontMatter as Record<string, any>,
      };
    } catch (error) {
      console.error(`Error processing metadata for blog ${slug}:`, error);
      throw error;
    }
  });
  return allBlogsMeta;
}
