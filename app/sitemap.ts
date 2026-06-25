import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://myvirtualtutor.com"

  const routes = [
    "",
    "/pricing",
    "/login",
    "/worksheets",
    "/worksheets/fractions-grade-6",
    "/worksheets/grade-3-addition",
    "/worksheets/grade-3-subtraction",
    "/worksheets/grade-4-multiplication",
    "/worksheets/grade-4-division",
    "/worksheets/grade-5-fractions",
    "/worksheets/grade-5-decimals",
    "/worksheets/grade-6-ratios",
    "/worksheets/grade-6-percentages",
    "/worksheets/pre-algebra-equations"
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route.includes("worksheets") ? 0.8 : 0.6
  }))
}
