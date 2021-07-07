import React from "react"
import SideBar from "react-sidebar"

import { iSidebarWrapper } from "./types"

const SidebarWrapper: React.FC<iSidebarWrapper> = props => {
  const {
    children,
    sidebarOpen,
    onToggleSidebar,
    desktopWidth,
    mobileWidth,
    tabWidth,
  } = props
  return (
    <>
      <div className="hidden sm:block">
        <SideBar
          sidebar={
            <>
              <div
                style={{ width: tabWidth || "50vw" }}
                className="hidden md:block h-full bg-white text-site-blue-dark overflow-y-auto"
              >
                {children}
              </div>
              <div
                style={{ width: desktopWidth || "70vw" }}
                className="hidden sm:block md:hidden h-full bg-white text-site-blue-dark overflow-y-auto"
              >
                {children}
              </div>
            </>
          }
          open={sidebarOpen}
          pullRight
          onSetOpen={onToggleSidebar}
          children={<div />} // This is just a props requirement
          shadow={true}
          styles={{
            sidebar: {
              position: "fixed",
              zIndex: "1000",
            },
            root: {
              position: "undefined",
            },
            content: {
              position: "undefined",
              top: "undefined",
              left: "undefined",
              right: "undefined",
              bottom: "undefined",
            },
            overlay: {
              zIndex: "5",
            },
          }}
        />
      </div>
      <div className="block sm:hidden">
        <SideBar
          sidebar={
            <div
              style={{ width: mobileWidth || "90vw" }}
              className="block sm:hidden h-full bg-white text-site-blue-dark overflow-y-auto"
            >
              {children}
            </div>
          }
          open={sidebarOpen}
          onSetOpen={onToggleSidebar}
          children={<div />} // This is just a props requirement
          shadow={true}
          styles={{
            sidebar: {
              position: "fixed",
              zIndex: "1000",
            },
            root: {
              position: "undefined",
            },
            content: {
              position: "undefined",
              top: "undefined",
              left: "undefined",
              right: "undefined",
              bottom: "undefined",
            },
            overlay: {
              zIndex: "5",
            },
          }}
        />
      </div>
    </>
  )
}

export default SidebarWrapper
