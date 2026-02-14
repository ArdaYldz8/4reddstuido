export type PricingCategory =
  | "studio"
  | "lighting"
  | "audio"
  | "camera"
  | "modifiers"
  | "backdrop"
  | "included";

export interface PricingItem {
  id: string;
  title: string;
  price: number;
  category: PricingCategory;
  note?: string;
  included?: boolean;
}

export const categoryLabels: Record<PricingCategory, string> = {
  studio: "Stüdyo Paketleri",
  lighting: "Işık Ekipmanları",
  audio: "Ses Ekipmanları",
  camera: "Kamera ve Lens",
  modifiers: "Işık Aksesuarları",
  backdrop: "Fon",
  included: "Kiralamaya Dahil",
};

export const pricingItems: PricingItem[] = [
  {
    id: "studio-full-day",
    title: "Tam Gün Kiralama",
    price: 11500,
    category: "studio",
  },
  {
    id: "studio-half-day",
    title: "Yarım Gün Kiralama",
    price: 6500,
    category: "studio",
  },
  {
    id: "studio-hourly",
    title: "Saatlik Kiralama",
    price: 1800,
    category: "studio",
    note: "Min. 2 saat",
  },
  {
    id: "godox-m600bi",
    title: "Godox M600Bi 600W Bi-Color LED Video Işığı",
    price: 1500,
    category: "lighting",
  },
  {
    id: "godox-la600r-k1",
    title: "Godox LA600R K1 600W RGB LED Işık",
    price: 1500,
    category: "lighting",
  },
  {
    id: "godox-tl120-rgb-kit",
    title: "Godox TL120 Dörtlü RGB Tüp Işık Kiti",
    price: 2500,
    category: "lighting",
  },
  {
    id: "godox-virso-m2",
    title: "Godox VIRSO Standart M2 Yaka Mikrofonu",
    price: 700,
    category: "audio",
  },
  {
    id: "godox-ad600-proii",
    title: "Godox AD600 PROII Paraflaş",
    price: 2800,
    category: "lighting",
  },
  {
    id: "godox-pt90-octobox",
    title: "Godox PT90 Octobox",
    price: 300,
    category: "modifiers",
  },
  {
    id: "godox-strip-box",
    title: "Godox Strip Box",
    price: 300,
    category: "modifiers",
  },
  {
    id: "godox-balon-85",
    title: "Godox 85cm Balon",
    price: 400,
    category: "modifiers",
  },
  {
    id: "godox-semsiye",
    title: "Godox Şemsiye (135cm-165cm)",
    price: 400,
    category: "modifiers",
  },
  {
    id: "godox-siyah-flat",
    title: "Godox Siyah Flat",
    price: 200,
    category: "modifiers",
  },
  {
    id: "sony-fe-24-70",
    title: "Sony FE 24-70mm f/2.8 GM II Lens (Sony E)",
    price: 1100,
    category: "camera",
  },
  {
    id: "sony-a7iv",
    title: "A7IV Kamera",
    price: 1500,
    category: "camera",
  },
  {
    id: "godox-x3-nano",
    title: "Godox X3 Nano Sony TTL Flaş Tetikleyici",
    price: 300,
    category: "camera",
  },
  {
    id: "godox-tripod-vertical",
    title: "Godox Tripod + Dikey Dönüştürücü",
    price: 1500,
    category: "modifiers",
  },
  {
    id: "colored-backdrop",
    title: "Renkli Fon",
    price: 1750,
    category: "backdrop",
    note: "Hardal, yeşil, scarlet kırmızısı, mavi, siyah",
  },
  {
    id: "la300r-ceiling-set",
    title: "7x LA300R K1 300W RGB LED Işık (Tavanda sabit - hareketsiz)",
    price: 0,
    category: "included",
    included: true,
    note: "Stüdyo kiralamaya dahildir",
  },
];
