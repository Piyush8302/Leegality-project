export const PAGE_SIZE = 12;

// an out of range page (0, negative, too big) is clamped to a valid one
export function paginate(items, page = 1, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    totalItems: items.length,
  };
}

// page numbers around the current page, e.g. page 8 of 17 -> [6, 7, 8, 9, 10]
export function getPageNumbers(currentPage, totalPages, maxVisible = 5) {
  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, currentPage - half);
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = [];
  for (let page = start; page <= end; page++) {
    pages.push(page);
  }
  return pages;
}
