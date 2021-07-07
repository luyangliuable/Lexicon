import React from "react"

import applyClassName from "./appleClassName"
import AppButton from "./index"

export const RoundedAppButton = applyClassName(AppButton, "rounded-full")

export const DarkBlueAppButton = applyClassName(
  RoundedAppButton,
  "site-bg-dark-blue text-white"
)

export const WhiteAppButton = applyClassName(
  RoundedAppButton,
  "bg-white text-blue-900 hover:bg-gray-100"
)
