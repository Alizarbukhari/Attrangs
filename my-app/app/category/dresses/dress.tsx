import { fetchProducts, Product } from "@/app/api/search/productRout";
import PageCard from "@/app/components/pagecard";

const Dresses = async () => {
  try {
    // Fetch all products from the backend
    const products: Product[] = await fetchProducts();

    // Filter products by category 'dresses'
    const filteredProducts = products.filter(
      (product: any) => product.category === "dresses"
    );

    if (filteredProducts.length === 0) {
      // Handle case where no products are found in the 'dresses' category
      return (
        <div>
          {/* Spacer or Banner */}
          <div className="w-full h-[150px] bg-white"></div>

          {/* Page Title */}
          <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
            <p className="text-black p-8 text-2xl font-bold">Dresses All Products</p>
          </div>

          {/* No Products Message */}
          <div className="mt-24 px-4 text-center">
            <p className="text-gray-500 text-lg">No dresses available at the moment.</p>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Spacer or Banner */}
        <div className="w-full h-[150px] bg-white"></div>

        {/* Page Title */}
        <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
          <p className="text-black p-8 text-2xl font-bold">Dresses All Products</p>
        </div>

        {/* Product Cards */}
        <div className="mt-24 px-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProducts.map((product) => (
              <PageCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);

    // Handle fetch error
    return (
      <div>
        {/* Spacer or Banner */}
        <div className="w-full h-[150px] bg-white"></div>

        {/* Page Title */}
        <div className="w-full h-[150px] flex items-center bg-[#f6f4ee]">
          <p className="text-black p-8 text-2xl font-bold">Dresses All Products</p>
        </div>

        {/* Error Message */}
        <div className="mt-24 px-4 text-center">
          <p className="text-red-500 text-lg">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default Dresses;






// Error: async/await is not yet supported in Client Components, only Server Components. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.
//     at createUnhandledError (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/internal/helpers/console-error.js:27:49)
//     at handleClientError (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/react-dev-overlay/internal/helpers/use-error-handler.js:44:56)
//     at console.error (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/client/components/globals/intercept-console-error.js:48:56)
//     at renderWithHooks (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:4632:21)
//     at updateFunctionComponent (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:8032:19)
//     at beginWork (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:9689:18)
//     at runWithFiberInDEV (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:544:16)
//     at performUnitOfWork (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:15064:22)
//     at workLoopConcurrent (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:15058:9)
//     at renderRootConcurrent (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:15033:15)
//     at performWorkOnRoot (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:14350:13)
//     at performWorkOnRootViaSchedulerTask (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/react-dom/cjs/react-dom-client.development.js:15955:7)
//     at MessagePort.performWorkUntilDeadline (webpack-internal:///(app-pages-browser)/./node_modules/next/dist/compiled/scheduler/cjs/scheduler.development.js:44:48)
