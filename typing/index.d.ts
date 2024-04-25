// eslint-disable-next-line @typescript-eslint/ban-types
declare type ForwarededComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>

declare type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never
  }[keyof Base]
>

declare type KeyofType<Base, Condition> = keyof SubType<Base, Condition>

// declare type Nullable<T> = {
//   [P in keyof T]: T[P] extends Array<infer U> ? Array<Nullable<U>> : Nullable<T[P]> | null
// }

declare type Nullable<T> = T | null

declare type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare type ListOfDataType<T> = {
  list?: T[]
  totalCount: number
}

declare type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

declare type LazyComponentProps = {
  lazyMargin?: string
  lazyRoot?: React.RefObject<Element>
}

declare type CustomError = {
  code: string
  message: string
}

declare type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

declare type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>