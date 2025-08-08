import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/resume.html`, lastModified: new Date() },
  ];
}

