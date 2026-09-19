import { useEffect } from 'react';

// Prevents the page behind a modal/lightbox from scrolling while it's open,
// so fixed/sticky elements (header, nav, footer) don't shift or peek through.
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}