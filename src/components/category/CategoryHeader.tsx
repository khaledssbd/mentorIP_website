import Image from "next/image";

interface CategoryHeaderProps {
  title: string;
  description: string;
  imageUrl?: string;
  postCount?: number;
}

export function CategoryHeader({ title, description, imageUrl, postCount }: CategoryHeaderProps) {
  return (
    <div className="bg-muted rounded-xl border border-border overflow-hidden mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{title}</h1>
            {postCount !== undefined && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/10">
                {postCount} Posts
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {imageUrl && (
          <div className="w-full md:w-[320px] h-[180px] relative rounded-lg overflow-hidden shrink-0 border border-border shadow-sm">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover contrast-[0.98] brightness-[0.98]"
              priority
            />
          </div>
        )}
      </div>
    </div>
  );
}
