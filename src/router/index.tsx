import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import { SignInPage, SignUpPage, Layout, CategoriesPage, BrandsPage, ProductsPage, NotFound, SubCategory, BrandCategory, AdsPage, Stock, Settins, Detail, ProtectedAuth, ProtectedLayout } from "@modules";
const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          path="/sign-in"
          element={
            <ProtectedAuth>
              <SignInPage />
            </ProtectedAuth>
          }
        />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Layout />
            </ProtectedLayout>
          }
        >
          <Route index element={<ProductsPage />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<SubCategory />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brand-category" element={<BrandCategory />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/settings" element={<Settins />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default index;
