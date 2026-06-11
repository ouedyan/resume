import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-resume-background-main p-6">
      <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="mb-2 font-lft text-sm font-semibold uppercase tracking-section text-resume-text-tertiary">
          404
        </p>
        <h1 className="mb-3 font-lft text-2xl font-semibold text-resume-text-primary">
          Page not found
        </h1>
        <p className="mb-6 font-lft text-resume-text-secondary">
          This resume language is not available.
        </p>
        <Link
          href="/en"
          className="inline-flex rounded-full bg-resume-text-primary px-5 py-2.5 font-lft text-sm font-medium text-white"
        >
          View the English resume
        </Link>
      </div>
    </main>
  );
}
