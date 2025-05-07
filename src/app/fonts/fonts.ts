import localFont from "next/font/local";

// export const arkhip = localFont({ src: "./Arkhip_font.otf" });
// export const rawengulk = localFont({ src: "./RawengulkSans-094.otf" });

export const arkhipRegular = localFont({
  src: "./Arkhip-Regular.otf",
  preload: true,
  display: "swap",
  variable: "--font-arkhip",
});

export const rawengulk = localFont({
  src: "./RawengulkRegular.otf",
  preload: true,
  display: "swap",
  variable: "--font-rawengulk",
});

export const rawengulkBold = localFont({
  src: "./RawengulkBold.otf",
  preload: true,
  display: "swap",
  variable: "--font-rawengulk-bold",
});

export const rawengulkLight = localFont({
  src: "./RawengulkLight.otf",
  preload: true,
  display: "swap",
  variable: "--font-rawengulk-light",
});

export const rawengulkDemibold = localFont({
  src: "./RawengulkDemibold.otf",
  preload: true,
  display: "swap",
  variable: "--font-rawengulk-demibold",
});

export const rawengulkPcs = localFont({
  src: "./RawengulkPcs.otf",
  preload: false,
  display: "swap",
  variable: "--font-rawengulk-pcs",
});

export const rawengulkUltralight = localFont({
  src: "./RawengulkUltralight.otf",
  preload: false,
  display: "swap",
  variable: "--font-rawengulk-ultralight",
});
