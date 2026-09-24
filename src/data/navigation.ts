import { localizePath, type UiLocale, type UiMessageKey } from "../i18n/ui";

export interface NavigationItem {
  label: string;
  href: string;
  disabled?: boolean;
  children?: NavigationItem[];
}

interface NavigationDefinition {
  labelKey: UiMessageKey;
  href: string;
  disabled?: boolean;
  children?: NavigationDefinition[];
}

type Translate = (key: UiMessageKey) => string;

const navigationDefinitions: NavigationDefinition[] = [
  {
    labelKey: "nav.virginResin",
    href: "/product-category/hat-nhua-nguyen-sinh",
    children: [
      { labelKey: "nav.peResin", href: "/products/hat-nhua-pe" },
      { labelKey: "nav.ppResin", href: "/products/hat-nhua-pp" },
      { labelKey: "nav.petResin", href: "/products/hat-nhua-pet" },
      { labelKey: "nav.pvcResin", href: "/products/hat-nhua-pvc" },
    ],
  },
  {
    labelKey: "nav.peFilm",
    href: "/product-category/mang-quan-pe",
    children: [
      { labelKey: "nav.handWrapFilm", href: "/products/mang-pe-quan-tay" },
      { labelKey: "nav.machineWrapFilm", href: "/products/mang-pe-quan-may" },
      { labelKey: "nav.brickWrapFilm", href: "/products/mang-pe-quan-gach" },
      {
        labelKey: "nav.clearPeFilm",
        href: "/products/mang-boc-pe-trong-suot",
      },
      { labelKey: "nav.coloredPeFilm", href: "/products/mang-boc-pe-mau" },
      { labelKey: "nav.customProduction", href: "/tin-tuc/at-san-xuat-theo-yeu-cau-tai-thai-son" },
    ],
  },
  {
    labelKey: "nav.petStrap",
    href: "/product-category/day-pet",
    children: [
      { labelKey: "nav.virginStrap", href: "/products/day-dai-nguyen-sinh" },
      { labelKey: "nav.ppStrap", href: "/products/day-dai-nhua-pp" },
      { labelKey: "nav.petStrap", href: "/products/day-dai-pet" },
    ],
  },
  {
    labelKey: "nav.bubbleWrap",
    href: "/product-category/cuon-xop-no",
    children: [
      { labelKey: "nav.airBubbleFilm", href: "/products/mang-xop-hoi" },
      { labelKey: "nav.peFoamRoll", href: "/products/cuon-xop-foam-pe" },
      { labelKey: "nav.foilFoam", href: "/products/xop-trang-bac" },
    ],
  },
  {
    labelKey: "nav.otherProducts",
    href: "/product-category/san-pham-khac",
    children: [
      {
        labelKey: "nav.edgeProtector",
        href: "/product-category/thanh-nep",
      },
      {
        labelKey: "nav.adhesiveTape",
        href: "/product-category/bang-dinh",
      },
      // { label: "Thanh nẹp đóng pallet", href: "/#thanh-nep-goc" },
      // { label: "Nẹp góc công nghiệp", href: "/#thanh-nep-goc" },
    ],
  },
  { 
    labelKey: "nav.news",
    href: "/tin-tuc",
    children: [
      { labelKey: "nav.aboutUs", href: "/gioi-thieu" },
      { labelKey: "nav.exportNews", href: "/tin-tuc/tin-xuat-khau" },
      { labelKey: "nav.productionInfo", href: "/tin-tuc/thong-tin-san-xuat" },
      { labelKey: "nav.recruitment", href: "/tin-tuc/tuyen-dung" },
    ],
  },
  // { label: "Sản phẩm khác", href: "#catalogue" },
  { labelKey: "nav.contact", href: "/lien-he" },
];

const productCategoryPathPrefix = "/product-category/";

const flattenNavigationDefinitions = (
  items: NavigationDefinition[],
): NavigationDefinition[] =>
  items.flatMap((item) => [
    item,
    ...flattenNavigationDefinitions(item.children ?? []),
  ]);

// Homepage uses this list, so changing category positions in the menu is enough
// to change their section order there as well (including submenu categories).
export const productCategoryNavigationOrder = flattenNavigationDefinitions(
  navigationDefinitions,
)
  .filter((item) => item.href.startsWith(productCategoryPathPrefix))
  .map((item) => item.href.slice(productCategoryPathPrefix.length));

// Homepage section headings use the same translation keys as the primary
// navigation. The taxonomy slug remains stable for queries and anchors, while
// the visible label follows the current UI locale even when older database
// records only have a Vietnamese taxonomy label.
export const productCategoryLabelKeys = new Map<string, UiMessageKey>(
  flattenNavigationDefinitions(navigationDefinitions)
    .filter((item) => item.href.startsWith(productCategoryPathPrefix))
    .map((item) => [
      item.href.slice(productCategoryPathPrefix.length),
      item.labelKey,
    ]),
);

export const getNavigationItems = (translate: Translate, locale: UiLocale): NavigationItem[] =>
  navigationDefinitions.map((item) => ({
    label: translate(item.labelKey),
    href: localizePath(item.href, locale),
    children: item.children?.map((child) => ({
      label: translate(child.labelKey),
      href: localizePath(child.href, locale),
      disabled: child.disabled,
    })),
  }));

// export const getNavigationItems = (translate: Translate): NavigationItem[] =>
//   translateNavigationItems(navigationDefinitions, translate);

export const isNavigationItemActive = (
  currentPath: string,
  href: string,
): boolean => {
  return href === "/" ? currentPath === "/" : false;
};
