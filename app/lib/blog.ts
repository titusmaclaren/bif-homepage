import fs from "node:fs";
import path from "node:path";

export type BlogFrontmatter = {
  title: string;
  slug: string;
  date: string;
  description: string;
  author: string;
  thumbnail: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  published: boolean;
};

export type BlogPost = BlogFrontmatter & {
  content: string;
  contentHtml: string;
  readingTime: string;
  urlPath: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
let postCache: BlogPost[] | null = null;

export function getAllPosts({ includeDrafts = false } = {}) {
  if (!postCache) {
    postCache = readPosts();
  }

  return postCache
    .filter((post) => includeDrafts || post.published)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getFeaturedPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function readPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { frontmatter, content } = parseFrontmatter(raw, file);
      return {
        ...frontmatter,
        content,
        contentHtml: markdownToHtml(content),
        readingTime: getReadingTime(content),
        urlPath: `/post/${frontmatter.slug}`,
      };
    });
}

function parseFrontmatter(raw: string, filename: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing frontmatter in ${filename}`);
  }

  const data: Record<string, string | boolean | string[]> = {};
  let arrayKey: string | null = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;

    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem && arrayKey) {
      const current = data[arrayKey];
      data[arrayKey] = Array.isArray(current)
        ? [...current, cleanValue(listItem[1]) as string]
        : [cleanValue(listItem[1]) as string];
      continue;
    }

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();

    if (!rawValue) {
      data[key] = [];
      arrayKey = key;
    } else {
      data[key] = cleanValue(rawValue);
      arrayKey = null;
    }
  }

  const frontmatter: BlogFrontmatter = {
    title: requireString(data, "title", filename),
    slug: requireString(data, "slug", filename),
    date: requireString(data, "date", filename),
    description: requireString(data, "description", filename),
    author: requireString(data, "author", filename),
    thumbnail: requireString(data, "thumbnail", filename),
    tags: requireStringArray(data, "tags", filename),
    metaTitle: requireString(data, "metaTitle", filename),
    metaDescription: requireString(data, "metaDescription", filename),
    canonicalUrl: requireString(data, "canonicalUrl", filename),
    published: requireBoolean(data, "published", filename),
  };

  return { frontmatter, content: match[2].trim() };
}

function cleanValue(value: string): string | boolean | string[] {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => cleanValue(item) as string);
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function requireString(
  data: Record<string, string | boolean | string[]>,
  key: keyof BlogFrontmatter,
  filename: string,
) {
  const value = data[key];
  if (typeof value !== "string" || !value) {
    throw new Error(`Missing ${key} frontmatter in ${filename}`);
  }
  return value;
}

function requireBoolean(
  data: Record<string, string | boolean | string[]>,
  key: keyof BlogFrontmatter,
  filename: string,
) {
  const value = data[key];
  if (typeof value !== "boolean") {
    throw new Error(`Missing ${key} frontmatter in ${filename}`);
  }
  return value;
}

function requireStringArray(
  data: Record<string, string | boolean | string[]>,
  key: keyof BlogFrontmatter,
  filename: string,
) {
  const value = data[key];
  if (!Array.isArray(value)) {
    throw new Error(`Missing ${key} frontmatter in ${filename}`);
  }
  return value;
}

function getReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${formatInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*-\s+/.test(lines[index])) {
        items.push(`<li>${formatInline(lines[index].replace(/^\s*-\s+/, ""))}</li>`);
        index += 1;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(
          `<li>${formatInline(lines[index].replace(/^\s*\d+\.\s+/, ""))}</li>`,
        );
        index += 1;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{2,3})\s+/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${formatInline(paragraph.join(" "))}</p>`);
  }

  return html.join("\n");
}

function formatInline(value: string) {
  return escapeHtml(value)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g,
      '<a href="$2">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/_([^_]+)_/g, "<em>$1</em>");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
