'use client'

// import { PropsWithChildren } from 'react'
import Wrapper from '@/layout'
import { ReactNode } from "react"
// import { useAuth } from 'state/auth/hooks'

interface RootLayoutProps {
  children: ReactNode;
  login: ReactNode;
}
const Layout: React.FC<RootLayoutProps> = (props) => {
  // const { isLegal } = useAuth()
  const isLegal = true
  if (!isLegal) {
    return props.login
  }
  // return <Wrapper>{props.children}</Wrapper>
  return <Wrapper />
  // return props.children
}


export default Layout