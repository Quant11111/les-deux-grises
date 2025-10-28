const themeVariables = {
  maxWidth: "1100px",
  borderRadius: "12px",
  fontMono:
    "ui-monospace, Menlo, Monaco, 'Cascadia Mono', 'Segoe UI Mono', 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro', 'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace",
  grassGreen: "#10504F",
  grassGreenRgb: "16, 80, 79", // "#10504F"
  corporateBlue: "#006A72",
  corporateBlueRgb: "0, 106, 114",
  coolBlueGrey: "#6A8A85",
  coolBlueGreyRgb: "106, 138, 133",
  lightCoolBlueGrey: "#92B2AD",
  lightCoolBlueGreyRgb: "146 178 173" /* #92B2AD */,
  terracotaEarth: "#A15F49",
  terracotaEarthRgb: "161, 95, 73",
  neutralEarth: "#CDA988",
  neutralEarthRgb: "205, 169, 136",
  cloudyMist: "#E3DDD2",
  lighterCloudyMist: "#F5F3EE",
  cloudyMistRgb: "227, 221, 210",
  nightGrey: "#2B2E32",
  nightGreyRgb: "43, 46, 50",
  lightForeground: "#FDFDFD",
  lightForegroundRgb: "253, 253, 253",
  darkForeground: "#141414",
  darkForegroundRgb: "20, 20, 20",
  foregroundRgb: "0, 0, 0",
  backgroundStartRgb: "16 80 79", // var(--grass-green)
  backgroundEndRgb: "205 169 136", // var(--neutral-earth)
  primaryGlow:
    "conic-gradient(from 180deg at 50% 50%, rgba(16, 80, 79, 0.2) 0deg, rgba(0, 106, 114, 0.2) 55deg, rgba(106, 138, 133, 0.2) 120deg, rgba(161, 95, 73, 0.2) 160deg, transparent 360deg)",
  secondaryGlow:
    "radial-gradient(rgba(253, 253, 253, 1), rgba(253, 253, 253, 0))",
  tileStartRgb: "227 221 210", // var(--cloudy-mist)
  tileEndRgb: "205 169 136", // var(--neutral-earth)
  tileBorder:
    "conic-gradient(rgba(20, 20, 20, 0.5), rgba(20, 20, 20, 0.25), rgba(20, 20, 20, 0.1875), rgba(20, 20, 20, 0.125), rgba(20, 20, 20, 0.0625), rgba(20, 20, 20, 0.0625), rgba(20, 20, 20, 0.5))",
  calloutRgb: "227 221 210", // var(--cloudy-mist)
  calloutBorderRgb: "106 138 133", // var(--cool-blue-grey)
  cardRgb: "180, 185, 188",
  cardBorderRgb: "131, 134, 135",
  warningRgb: /* warm lightg red */ "rgba(255, 140, 148, 1)",

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export default themeVariables;
