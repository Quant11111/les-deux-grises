"use server";

import themeVariables from "@/utils/themeVariables";
import { Button } from "@mui/material";
import LocaleLayout from "./[locale]/layout";

export default async function NotFound() {
  return (
    <LocaleLayout
      params={{
        locale: "en",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          fontSize: "5rem",
          color: `${themeVariables.cloudyMist}`,
          textAlign: "center",
        }}
      >
        <h1>404 - Page Not Found</h1>
        <p>
          <Button
            size="large"
            sx={{
              color: `${themeVariables.cloudyMist}`,
              border: "0.5rem solid",
              borderColor: `${themeVariables.cloudyMist}`,
              borderRadius: "1rem",
              paddingX: "4rem",
              ":hover": {
                background: `${themeVariables.cloudyMist}`,
                color: `${themeVariables.neutralEarth}`,
              },
            }}
          >
            <a style={{ fontSize: "5rem" }} href="/">
              Homepage
            </a>
          </Button>
        </p>
      </div>
    </LocaleLayout>
  );
}
