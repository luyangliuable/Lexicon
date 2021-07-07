import React from "react"

import applyClassName from "./appleClassName"
import AppButton from "./index"

export const RoundedAppButton = applyClassName(AppButton, "rounded-full")

export const GrayAppButton = applyClassName(
  RoundedAppButton,
  "bg-gray-200 text-gray-500"
)

export const DarkBlueAppButton = applyClassName(
  RoundedAppButton,
  "bg-blue-900 text-white hover:bg-blue-700"
)

export const GreenAppButton = applyClassName(
  RoundedAppButton,
  "bg-green-500 text-white hover:bg-green-600"
)

export const RedAppButton = applyClassName(
  RoundedAppButton,
  "bg-red-700 hover:bg-red-500 text-white"
)

export const WhiteAppButton = applyClassName(
  RoundedAppButton,
  "bg-white text-blue-900 hover:bg-gray-100"
)
