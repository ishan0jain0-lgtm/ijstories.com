import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(src: string | undefined): string {
  if (!src) return "";
  
  let resolvedUrl = src;
  
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    const cleanSrc = src.startsWith("/") ? src : "/" + src;
    const isLocalStatic = ["/brand_identity_mockup.png", "/creative_direction_portrait.png", "/logo.jpg", "/logo.png", "/backgroundvideo.mp4"].includes(cleanSrc.split("?")[0]);
    if (!isLocalStatic) {
      if (!cleanSrc.startsWith("/ijstories_uploads/")) {
        resolvedUrl = `https://ik.imagekit.io/sktwm4dau/ijstories_uploads${cleanSrc}`;
      } else {
        resolvedUrl = `https://ik.imagekit.io/sktwm4dau${cleanSrc}`;
      }
    } else {
      resolvedUrl = cleanSrc;
    }
  }

  if (resolvedUrl.includes("ik.imagekit.io")) {
    const isVideo = resolvedUrl.toLowerCase().match(/\.(mp4|webm|ogg|mov|m4v)(\?|$)/);
    if (!isVideo && !resolvedUrl.includes("tr=")) {
      const separator = resolvedUrl.includes("?") ? "&" : "?";
      resolvedUrl = `${resolvedUrl}${separator}tr=w-1600`;
    }
  }
  
  return resolvedUrl;
}
