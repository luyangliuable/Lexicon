import React from "react"

import Navbar from "../Navbar"

const Layout: React.FC<{ children: any; pageId: string }> = ({
  children,
  pageId,
}) => (
  <>
    <Navbar pageId={pageId} />
  </>
)

export default Layout
