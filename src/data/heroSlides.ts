import type { UiMessageKey } from "../i18n/ui";

export type HeroSlideLayout = "factory" | "catalogue" | "logistics";

export interface HeroBenefit {
  titleKey: UiMessageKey;
  descriptionKey?: UiMessageKey;
}

export interface HeroSlide {
  id: number;
  image: string;
  altKey: UiMessageKey;
  href?: string;
  layout: HeroSlideLayout;
  headlineKeys: UiMessageKey[];
  subheadingKey?: UiMessageKey;
  productLabelKeys?: UiMessageKey[];
  benefits?: HeroBenefit[];
  footerKey?: UiMessageKey;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/banners/ảnh nền banner 1.png",
    altKey: "hero.slide1.alt",
    href: "#bang-dinh",
    layout: "factory",
    headlineKeys: [
      "hero.slide1.headline1",
      "hero.slide1.headline2",
      "hero.slide1.headline3",
    ],
    productLabelKeys: [
      "hero.product.virginResin",
      "hero.product.peFilm",
      "hero.product.petStrap",
      "hero.product.tape",
      "hero.product.edgeProtector",
      "hero.product.other",
    ],
    benefits: [
      { titleKey: "hero.slide1.virginLldpe" },
      { titleKey: "hero.slide1.fiveS" },
      { titleKey: "hero.slide1.stableQuality" },
    ],
  },
  {
    id: 2,
    image: "/images/banners/ảnh nền banner 2.png",
    altKey: "hero.slide2.alt",
    href: "#mang-pe",
    layout: "catalogue",
    headlineKeys: ["hero.slide2.headline1", "hero.slide2.headline2"],
    subheadingKey: "hero.slide2.subheading",
    productLabelKeys: [
      "hero.product.virginResin",
      "hero.product.peFilm",
      "hero.product.petStrap",
      "hero.product.tape",
      "hero.product.edgeProtector",
      "hero.product.other",
    ],
  },
  {
    id: 3,
    image: "/images/banners/ảnh nền banner 3.png",
    altKey: "hero.slide3.alt",
    href: "#lien-he",
    layout: "logistics",
    headlineKeys: ["hero.slide3.headline1", "hero.slide3.headline2"],
    benefits: [
      {
        titleKey: "hero.slide3.fastDelivery",
        descriptionKey: "hero.slide3.fastDeliveryDescription",
      },
      {
        titleKey: "hero.slide3.sampleAvailable",
        descriptionKey: "hero.slide3.sampleAvailableDescription",
      },
      {
        titleKey: "hero.slide3.transparentPricing",
        descriptionKey: "hero.slide3.transparentPricingDescription",
      },
      {
        titleKey: "hero.slide3.readyStock",
        descriptionKey: "hero.slide3.readyStockDescription",
      },
      {
        titleKey: "hero.slide3.partnership",
        descriptionKey: "hero.slide3.partnershipDescription",
      },
      {
        titleKey: "hero.slide3.ecoPackaging",
        descriptionKey: "hero.slide3.ecoPackagingDescription",
      },
    ],
    footerKey: "hero.slide3.footer",
  },
];
