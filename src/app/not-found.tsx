import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center text-center p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="muted">The page you’re looking for doesn’t exist.</p>
        <Link className="btn mt-4 inline-block" href="/">Go home</Link>
      </div>
    </div>
  );
}

