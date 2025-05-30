import { ReactNode } from "react";



const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-calistoga text-accent-3 mb-4 mt-6 first:mt-0 leading-tight">
    {children}
  </h1>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-calistoga text-accent-3 mb-3 mt-6 leading-tight">
    {children}
  </h2>
);

const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl md:text-2xl font-semibold text-accent-2 mb-2 mt-4 leading-tight">
    {children}
  </h3>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-base md:text-lg text-accent-1 leading-relaxed mb-4">
    {children}
  </p>
);

const Blockquote = ({ children }: { children: ReactNode }) => (
  <blockquote className="border-l-4 border-accent-1 bg-primary-2 pl-6 pr-4 py-3 mb-4 italic text-accent-1 rounded-r-lg">
    {children}
  </blockquote>
);

const Ul = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc list-inside mb-4 space-y-1 text-accent-1 ml-4">
    {children}
  </ul>
);

const Ol = ({ children }: { children: ReactNode }) => (
  <ol className="list-decimal list-inside mb-4 space-y-1 text-accent-1 ml-4">
    {children}
  </ol>
);

const Li = ({ children }: { children: ReactNode }) => (
  <li className="text-base md:text-lg leading-relaxed">
    {children}
  </li>
);

const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-accent-3">{children}</strong>
);

const Em = ({ children }: { children: ReactNode }) => (
  <em className="italic text-accent-2">{children}</em>
);

const A = ({ children, href }: { children: ReactNode; href?: string }) => (
  <a
    href={href}
    className="text-accent-3 hover:text-accent-2 underline underline-offset-2 transition-colors duration-200 font-medium"
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
  >
    {children}
  </a>
);

const Hr = () => (
  <hr className="border-0 h-px bg-gradient-to-r from-transparent via-primary-4 to-transparent my-6" />
);

const Table = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto mb-4">
    <table className="min-w-full border border-primary-3 rounded-lg overflow-hidden">
      {children}
    </table>
  </div>
);

const Th = ({ children }: { children: ReactNode }) => (
  <th className="bg-primary-3 border-b border-primary-4 px-4 py-3 text-left font-semibold text-accent-3">
    {children}
  </th>
);

const Td = ({ children }: { children: ReactNode }) => (
  <td className="border-b border-primary-3 px-4 py-3 text-accent-1">
    {children}
  </td>
);



const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  strong: Strong,
  em: Em,
  a: A,
  hr: Hr,
  table: Table,
  th: Th,
  td: Td,
};

export default MDXComponents;
