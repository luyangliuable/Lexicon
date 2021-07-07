export type toggleSidebar_FuncType = (open: boolean) => void

export interface iSidebarWrapper {
  children?: object
  sidebarOpen: boolean
  onToggleSidebar: toggleSidebar_FuncType
  mobileWidth?: string
  tabWidth?: string
  desktopWidth?: string
}
