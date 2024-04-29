'use client'

// import { PropsWithChildren } from 'react'
import Wrapper from '@/layout'
import { ReactNode, useEffect, useState } from "react"
import { useAuth } from '@/state/auth/hooks'

interface RootLayoutProps {
  children: ReactNode;
  login: ReactNode;
}
const Layout: React.FC<RootLayoutProps> = (props) => {
  const { isLegal } = useAuth()
  const [mounted, setMounted] = useState(false);
  /** 低端招术处理非server render */
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isLegal === false) {
    return props.login
  }
  return <Wrapper >{props.children}</Wrapper>
}


export default Layout