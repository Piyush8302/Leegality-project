# Product Store

Product listing and detail app built with React + React Router, using the
"DummyJSON API" (https://dummyjson.com/docs/products).

Live demo: https://leegality-project.vercel.app

## Setup

Needs Node 18+.

```bash
npm install
cp .env.example .env
npm run dev
```

Opens on http://localhost:5173

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

### Env

Only one variable, and it has a fallback in the code, so the app runs even without a `.env` file.

```
VITE_API_BASE_URL=https://dummyjson.com
```

## What's included

Listing page has the filter sidebar on the left and the product grid on the right, with pagination
at the bottom. Categories come from the API, price is a min/max input, and the brand list is built
from whatever products are loaded. All three work together and the page goes back to 1 when any
filter changes. There's also a search box in the header that filters by product title.

Detail page shows the image, title, price, rating, brand, category, description and reviews. The
back button takes you to the listing with your filters still applied.

Loading, error (with a retry button) and empty states are handled everywhere, and the layout works
down to 375px - the sidebar collapses behind the menu button in the header.

## Folder structure

```
src/
  api/          all the fetch calls
  hooks/        data fetching + filter state
  utils/        filtering and pagination helpers
  components/   header, filters, product, pagination, common
  pages/        listing, detail, not found
```

## Decisions I made

**Filters are stored in the URL instead of useState.**
One of the requirements was that filters should still be there when you come back from the detail
page. If I kept them in state, the listing component unmounts and the state is gone. Putting
everything in the URL (`?category=laptops&brand=Apple&minPrice=100&page=2`) solved that without any
extra state library - going back just restores the same URL. Refresh and sharing a link work too.
I used `replace: true` when updating filters, otherwise every checkbox click adds a history entry
and the back button takes forever to get out of the page.

**Category filtering happens on the API, brand and price on the client.**
The API only supports filtering by category. It can't filter by brand or price, so those have to
happen in the browser. That also means I can't use the API's `limit`/`skip` pagination - if the API
gives me 30 products and I then filter them by brand, the page count and the results would be wrong.
So I load everything for the selected category with `limit=0` (194 products in total), filter it, and
paginate the filtered list. That's fine for this dataset but it wouldn't scale - with a real catalogue
the filtering would have to move to the backend.

**API calls in one file, one hook per thing.**
`api/productsApi.js` has the endpoints and the error handling (fetch doesn't throw on 404/500, so I
check `response.ok` there). Then `useProducts`, `useProduct` and `useCategories` return
`{ data, loading, error, retry }` and the pages just deal with layout.

**Filtering and pagination are plain functions.**
`filterProducts` and `paginate` don't know anything about React, they just take data and return data.
Easier to read and easy to test later.

**Race condition on category switch.**
If you click Smartphones and then Laptops quickly, the slower Smartphones response can come back last
and overwrite the laptops. Each effect sets an `ignore` flag in its cleanup so only the latest
response updates state.

**Styling** is CSS Modules + a few CSS variables in `index.css` for colors and spacing. No UI library,
since the brief asked to avoid them.

## Assumptions

- Category is single-select. The API takes one category per request, so picking one replaces the
  previous. Clicking the selected one again clears it.
- Brands are taken from the loaded products, so the list changes with the category. I clear the
  selected brands when the category changes because those brands usually don't exist in the new one.
- Products with no brand (groceries, etc.) are skipped in the brand list.
- Price applies on its own about half a second after you stop typing, and immediately on Apply or
  Enter. The design has an Apply button but the brief says filters should update immediately, so I
  did both.
- Cart and account icons in the header are just visual, there's no user or cart in this exercise.
- The search box inside the sidebar filters the category and brand lists, not the products. Product
  search is the one in the header.
- The mockup shows pagination on the detail page as well. That doesn't make sense for a single
  product so I left it out.

## What I'd do with more time

- Move filtering and pagination to the backend so it works with a bigger catalogue
- Tests - unit tests for the filter and pagination helpers, and an e2e test for the
  filter -> detail -> back flow
- React Query for caching, right now going back refetches the category
- Sorting by price/rating, and a price slider instead of two inputs
- Skeleton cards instead of the spinner, and keeping the scroll position when going back
- Dark mode, the color variables are already set up for it
