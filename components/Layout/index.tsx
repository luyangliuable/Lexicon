import React from 'react'
import Navbar from "../Navbar";

const Layout : React.FC<{children : any}> = ({children}) => (
  <>
    <Navbar/>
  </>
)

export default Layout