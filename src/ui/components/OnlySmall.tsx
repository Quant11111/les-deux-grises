"use client";

import { memo } from "react";
import styled from "styled-components";

const OnlySmall = styled.div`
  @media (min-width: 1101px) {
    display: none;
  }
`;

export default memo(OnlySmall);
