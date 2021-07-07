import React from "react"

import { DarkBlueAppButton } from "../components/AppButton/buttons"
import Layout from "../components/Layout"

const Index: React.FC = () => {
  return (
    <Layout pageId="home">
      <DarkBlueAppButton title="Hello" />
    </Layout>
  )
}

export default Index
