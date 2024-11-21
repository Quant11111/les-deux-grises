"use client";

import { useState } from "react";

export default function AboutContent({
  title1,
  content1,
  title2,
  content2,
}: {
  title1: string;
  content1: string;
  title2: string;
  content2: string;
}) {
  //true : who we are
  //false : what we do
  const [toogle, setToogle] = useState(true);
  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 5rem)",
        width: "100%",
        overflow: "hidden",
      }}
    ></div>
  );
}
