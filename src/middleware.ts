import { defineMiddleware } from "astro:middleware";
import { canonicalizePostSlug } from "./utils/content-slugs";
import { decodeSlugSafely } from "./utils/slugify";

const localePrefixes = new Set(["en", "zh"]);

function getPostRoute(pathname: string):
  | { prefix: string; slug: string }
  | undefined {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 2 && parts[0] === "tin-tuc") {
    return { prefix: "", slug: parts[1] };
  }

  if (
    parts.length === 3 &&
    localePrefixes.has(parts[0]) &&
    parts[1] === "tin-tuc"
  ) {
    return { prefix: `/${parts[0]}`, slug: parts[2] };
  }

  return undefined;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const route = getPostRoute(context.url.pathname);

  if (route) {
    const decodedSlug = decodeSlugSafely(route.slug);
    const canonicalSlug = canonicalizePostSlug(decodedSlug);

    if (canonicalSlug && canonicalSlug !== decodedSlug) {
      const target = new URL(
        `${route.prefix}/tin-tuc/${canonicalSlug}${context.url.search}`,
        context.url,
      );
      return Response.redirect(target, 301);
    }
  }

  return next();
});

