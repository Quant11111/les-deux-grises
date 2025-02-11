"use client";

import { InstagramSvg } from "@/ui/svg/InstagramSvg";
import { MailSvg } from "@/ui/svg/MailSvg";
import { PhoneSvg } from "@/ui/svg/PhoneSvg";
import themeVariables from "@/utils/themeVariables";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function ContactContentSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      style={{
        borderTopRightRadius: "300000rem",
        borderTopLeftRadius: "300000rem",
        //border: `3px solid ${themeVariables.lightForeground}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        paddingBottom: "4rem",
        gap: "2rem",
        background: `linear-gradient(to bottom, ${themeVariables.cloudyMist}, ${themeVariables.grassGreen} )`,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {" "}
        <div
          style={{
            backgroundColor: themeVariables.lightForeground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "10rem",
            height: "13rem",
            borderTopRightRadius: "300000rem",
            borderTopLeftRadius: "300000rem",
          }}
          onMouseEnter={() => setActive(1)}
        >
          <PhoneSvg size={100} />
        </div>{" "}
        <div
          style={{
            backgroundColor: themeVariables.lightForeground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "10rem",
            height: "13rem",
            borderTopRightRadius: "300000rem",
            borderTopLeftRadius: "300000rem",
          }}
          onMouseEnter={() => setActive(2)}
        >
          <MailSvg size={100} />
        </div>
        <div
          style={{
            backgroundColor: themeVariables.lightForeground,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "10rem",
            height: "13rem",
            borderTopRightRadius: "300000rem",
            borderTopLeftRadius: "300000rem",
          }}
          onMouseEnter={() => setActive(3)}
        >
          {" "}
          <InstagramSvg size={100} />
        </div>
      </div>
      {active === 0 && (
        <span
          style={{
            color: themeVariables.lightForeground,
          }}
        >
          Get in touch
        </span>
      )}
      {active === 1 && (
        <span
          style={{
            color: themeVariables.lightForeground,
          }}
        >
          0600000000
        </span>
      )}
      {active === 2 && (
        <span
          style={{
            color: themeVariables.lightForeground,
          }}
        >
          mail@gmail.com
        </span>
      )}
      {active === 3 && (
        <span
          style={{
            color: themeVariables.lightForeground,
          }}
        >
          Come Check it out
        </span>
      )}
    </section>
  );
}
