import loadabl from "@loadable/component";
import { LoadingSpin } from "@components";

const SignInPage = loadabl(() => import("./auth/pages/sign_in"), {
  fallback: <LoadingSpin />,
});
const SignUpPage = loadabl(() => import("./auth/pages/sign_up"), {
  fallback: <LoadingSpin />,
});
const Layout = loadabl(() => import("./layout/index"), {
  fallback: <LoadingSpin />,
});
const ProductsPage = loadabl(() => import("./products/pages"), {
  fallback: <LoadingSpin />,
});
const CategoriesPage = loadabl(() => import("./categories/pages"), {
  fallback: <LoadingSpin />,
});
const SubCategory = loadabl(() => import("./sub-category/pages"), {
  fallback: <LoadingSpin />,
});
const BrandsPage = loadabl(() => import("./brands/pages"), {
  fallback: <LoadingSpin />,
});
const BrandCategory = loadabl(() => import("./brand-category/pages"), {
  fallback: <LoadingSpin />,
});
const AdsPage = loadabl(() => import("./ads/pages"), {
  fallback: <LoadingSpin />,
});
const Stock = loadabl(() => import("./stock/pages/"), {
  fallback: <LoadingSpin />,
});
const Settins = loadabl(() => import("./settings/pages"), {
  fallback: <LoadingSpin />,
});
const NotFound = loadabl(() => import("./not-found"), {
  fallback: <LoadingSpin />,
});
const Detail = loadabl(() => import("./product-detail/pages"), {
  fallback: <LoadingSpin />,
});
import { ProtectedLayout, ProtectedAuth } from "./protected-route";

export { SignInPage, SignUpPage, Layout, CategoriesPage, BrandsPage, ProductsPage, Detail, NotFound, SubCategory, BrandCategory, AdsPage, Stock, Settins, ProtectedLayout, ProtectedAuth };
