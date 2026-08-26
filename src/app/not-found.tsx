import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content flex flex-col items-start gap-4 py-32">
      <p className="font-mono text-sm text-signal">0x404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-ink-soft">
        Whatever you were looking for isn&apos;t at this address.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Back to home
      </Link>
    </div>
  );
}
