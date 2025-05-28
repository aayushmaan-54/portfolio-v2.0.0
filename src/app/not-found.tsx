"use client";
import { useRouter } from "next/navigation";


export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <div className="font-geist-mono flex flex-col items-center justify-center text-center mt-34 px-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
          <span>4🚫4</span>
          <span>: Page Not Found</span>
        </h1>

        <p className="text-xl font-black mb-2">Looks like someone forgot to <span className="bg-primary-2 px-2 py-0.5 border border-primary-4 rounded-md">git push</span> this page.</p>

        <p className="font-bold text-base text-accent-1/40 mt-2 mb-6">No worries though—debugging is 90% of the job anyway.</p>

        <button
          onClick={() => router.push("/")}
          type="button"
          className="button-1 cursor-pointer font-bold"
        >
          👉 Return to <span>main</span>
        </button>
      </div>
    </>
  );
}
