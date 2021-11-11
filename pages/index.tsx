import React from "react"
import Layout from "../components/Layout"
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import IndexPage from "../components/pageComponents/IndexPage"

const Index: React.FC = () => {
  return (
    <Layout pageId="home">
      <IndexPage />
    </Layout>
  )
}

export default Index
