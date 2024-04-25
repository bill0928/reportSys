type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type RoundVariant = 'full' | 'none' | SizeVariant
type LayoutVariant = 'vertical' | 'horizontal'

// Section
type SectionStyles = {
  content: string
}

// Button
type ButtonVariant = 'default' | 'primary' | 'fancy' | 'danger' | 'warning' | 'success' | 'submit' | 'cancel'
type ButtonSize = 'xxs' | SizeVariant

type NoCancelButtonVariant = 'default' | 'primary' | 'fancy' | 'danger' | 'warning' | 'success' | 'submit'

type ButtonBasicStyle = {
  isQuiet: {
    true: Record<NoCancelButtonVariant, string>
    false: Record<NoCancelButtonVariant, string>
  },
  cancel: string
}

type ButtonSizeStyle = Record<ButtonSize, string>

type ButtonStyles = {
  glow: Omit<ButtonBasicStyle, 'cancel'>

  interactive: ButtonBasicStyle

  bordered: Record<NoCancelButtonVariant, string>

  iconButton: SizeStyle
} & ButtonBasicStyle &
  ButtonSizeStyle

// Checkbox

// Input
type InputStyles = {
  default?: string
  hover?: string
  focus?: string
  withinFocus?: string
  disabled?: string
  rounded?: Record<RoundVariant, string>
  text?: Record<SizeVariant, string>
  textarea: Record<SizeVariant, string>
} & Record<SizeVariant, string>

// Modal
type ModalStyles = {
  title?: string
  description?: string
  close: string
  overlay: string
  content: {
    background: string
    inner?: {
      default: string
      mobile?: string
    }
    rounded: {
      default: string
      mobile?: string
    }
    shadow: {
      default: string
      mobile?: string
    }
    variables?: {
      default?: Record<string, string>
      mobile?: Record<string, string>
    }
  }
}

// Popover

// Switch

// Tabs
type TabsStyles = {
  container: string
  item: string
  divider: string
  content: {
    text: string
    icon: string
    selected: {
      text: string
      icon: string
    }
  }
  rounded: Record<RoundVariant, string>
  background: string
  border: string
  selected: string
  hovering: string
  fullWidth?: Record<string, true>
  overwrite?: Record<string, RecursivePartial<Omit<TabsStyles, 'fullWidth' | 'overwrite'>>>
} & Record<SizeVariant, string>

// Texts
type TextStyles = {
  hero: string
  title: string
  subtitle: string
  small: string
  body: string
  caption: string
  subcaption: string
  description: string
  tips: string
  tiny: string
}

// Toast

// Tooltip

// Carousel
type CarouselStyle = {
  controlsContainer: string
  controls: string
}

type CarouselStyles = {
  default: CarouselStyle
  mobile?: RecursivePartial<CarouselStyle>
}

// Table
type TableStyles = {
  container: string
  header: string
  body: string
  row: string
  cell: string
  phoneCell: string
  alternative?: string
}

type PaginationStyles = {
  container: string
  prev?: string
  next?: string
  item: string
  selected: string
}

// Dock
type GradientDockStyle = {
  type: 'gradient'
  mask: string
  gradient: string
}

type DockStyle = {
  mask?: string
  background: string
  container?: string
}

// Layout
type LayoutStyle = {
  sidebar: {
    container?: {
      default?: string,
      mobileDefault?: string,
      mobileAce?: string
    } 
    background: string
    item: string
    subItem?: string
    subItemParent?: {
      expanded?: string
      unExpanded?: string
    },
    toggle?: string
  }
  header: string
  footer: string
  main?: string
}

// Account
type AccountStyle = {
  banner?: {
    header?: string
    button?: string
    avatars?: {
      default?: {
        editIconPosition?: string
      },
      mobile?: {
        editIconPosition?: string
      },
    }
  },
  info?: {
    button?: string
    VIPViewMoreButtonOnMobile?: string
    changeCurrencyButton?: string
  },
  card: {
    deposit: {
      defaultText: string
      background: string
      checkbox: string
    }
    withdraw: {
      defaultText: string
      background: string
      checkbox: string
    }
  }
}

type UserAvatarStyles = {
  header?: string
  menuDropdown?: string
  shape?: string
}

type MenuDropdownStyles = {
  item?: string
  itemLabel?: string
}

type LiveFeedStyles = {
  success: string
}

type ComponentThemeConfig = {
  body?: string
  mobileFrame?: string
  section?: RecursivePartial<SectionStyles>
  button?: RecursivePartial<ButtonStyles>
  checkbox?: RecursivePartial<CheckboxStyles>
  input?: RecursivePartial<InputStyles>
  modal?: RecursivePartial<ModalStyles>
  popover?: RecursivePartial<PopoverStyles>
  switch?: RecursivePartial<SwitchStyles>
  tabs?: RecursivePartial<TabsStyles>
  text?: RecursivePartial<TextStyles>
  toast?: RecursivePartial<ToastStyles>
  tooltip?: RecursivePartial<TooltipStyles>
  carousel?: CarouselStyles
  table?: RecursivePartial<TableStyles>
  pagination?: RecursivePartial<PaginationStyles>
  dock: DockStyle
  layout: LayoutStyle
  account?: RecursivePartial<AccountStyle>
  override?: Record<string, RecursivePartial<Omit<ComponentThemeConfig, 'override'>>>
  menu?: string
  userAvatar?: UserAvatarStyles
  menuDropdown?: MenuDropdownStyles
  liveFeed?: LiveFeedStyles
}
