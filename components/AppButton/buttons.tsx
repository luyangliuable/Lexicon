import React from "react"

import applyClassName from "./appleClassName"
import AppButton from "./index"

export const RoundedAppButton = applyClassName(AppButton, "rounded-full")

export const DarkBlueAppButton = applyClassName(
  RoundedAppButton,
  "site-bg-dark-blue text-white"
)
