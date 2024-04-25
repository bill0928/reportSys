// From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
type AutocompleteTypes =
  | 'on'
  | 'off'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo'

type GameCardOrientation = 'landscape' | 'portrait'

type Size = {
  width: number
  height: number
}

type TailwindThemeConfig = {
  borderRadius: {
    none: string
    sm: string
    DEFAULT: string
    md: string
    lg: string
    full: string
    xl: string
    '2xl': string
    '3xl': string
  }
}

type LayoutThemeConfig = {
  mode: 'center' | 'full-width-header' | 'align-main-header'
  main: {
    maxWidth: number
    minWidth: number
    padding: {
      default: number
      tablet: number
      phone: number
    }
  }
  logo: {
    width: number
    height: number
    marginRight: number
  }
  header: {
    height: number
  }
  footer: {
    padding: {
      default: number
      tablet: number
      phone: number
    }
  }
  sidebar: {
    width: number
    padding: number
    itemPadding: number
    iconSize: number
    toggleIconSize: number
    indent: number
    arrowSize: number
    collapsedWidth: number
    expanded?: string[]
  }
  ace: {
    sliders: [number, number, number]
    header: 'fixed' | 'static'
    left: ('sidebar' | 'site_fn' | 'language' | 'theme' | 'divider' | 'banners' | 'logout')[]
    dock: {
      height: number
      showPlayingGame: boolean
    }
  }
  override?: Record<
    string,
    RecursivePartial<Pick<LayoutThemeConfig, 'mode' | 'main' | 'sidebar' | 'ace'>>
  >
  
}

type FontWithVariable = {
  variable?: string
}

type ThemeFonts = {
  sans?: FontWithVariable
  serif?: FontWithVariable
  mono?: FontWithVariable
  condensed?: FontWithVariable
}

type FontType = 'font-sans' | 'font-serif'
type LanguageCode = 'en-US' | 'zh-CN' | 'pt-PT'
type ThemeType = 'dark' | 'light'

type DevicePlatformType = 'web' | 'ios' | 'android'
type DataPlatformType = {
  id: string
  extends?: {
    ios?: string
    android?: string
  }
}
type DataBuriedType = {
  platform: {
    google?: DataPlatformType
    facebook?: DataPlatformType
    appsFlyer?: DataPlatformType
  }
  tracking: Record<string, boolean>
  override?: {
    ios?: string
    android?: string
  }
}
type DataEventInfoType = {
  pathname?: string
  username?: string
}

type AuthSSOType =
  | 'telegram'
  | 'google'
  // 'facebook' | 'twitter' |
  | 'wallet.tron'
  | 'wallet.metamask'
  | 'wallet.binance'
  | 'wallet.coin98'

type AuthConfig = {
  sso: AuthSSOType[] | false
}

type ThemeConfig = {
  font: FontType
  tailwind: TailwindThemeConfig
  layout: LayoutThemeConfig
  localisation: LanguageType[]
  auth: AuthConfig
  theme: ThemeType[]
  styles?: ComponentThemeConfig
}

