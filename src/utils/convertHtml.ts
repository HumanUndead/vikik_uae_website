export const stripHTML = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").trim();
};
