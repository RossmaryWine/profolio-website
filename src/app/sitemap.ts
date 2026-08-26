import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

// TODO: Replace with your deployed domain once you have one.
const baseUrl = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/experience", "/projects", "/skills", "/about"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects
    .filter((p) => p.detail)
    .map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
    }));

  return [...staticRoutes, ...projectRoutes];
}
