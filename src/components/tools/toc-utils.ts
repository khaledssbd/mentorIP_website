import * as cheerio from "cheerio";
import slugify from "slugify";

export interface TocItem {
  id: string;
  text: string;
  level: string;
}

export interface ProcessedContent {
  processedHtml: string;
  toc: TocItem[];
}

export const processHtmlForToc = (rawHtml: string): ProcessedContent => {
  const $ = cheerio.load(rawHtml);
  const toc: TocItem[] = [];

  $("h2, h3").each((index, element) => {
    const el = $(element);
    const text = el.text();

    const id = slugify(text, { lower: true, strict: true }) + `-${index}`;

    el.attr("id", id);

    toc.push({
      id,
      text,
      level: element.tagName.toLowerCase(),
    });
  });
  // Make all images rounded
  $("img").addClass("rounded-2xl");

  return {
    processedHtml: $.html(),
    toc,
  };
};
