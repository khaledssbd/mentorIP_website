import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 max-w-6xl">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mx-auto">
            <span className="text-3xl">🔎</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground">
            The page you’re looking for doesn’t exist or may have been moved. Check the URL
            or head back to a safe place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="sm" className="font-bold">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
