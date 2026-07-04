'use client';

import { useEffect } from 'react';
import { trackPostView } from '@/services/post';

export default function PostViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    // We don't await here because it's a side effect and we don't want to block anything
    trackPostView(slug);
  }, [slug]);

  return null;
}
