export type WithChildren = { children?: React.ReactNode | undefined }
export type LikeNull = undefined | null

export type IRef<T> = (() => T | LikeNull) | React.MutableRefObject<T | LikeNull> | React.RefObject<T | LikeNull>

export interface ClassStyle {
  className?: string
  style?: React.CSSProperties
}

export interface CommonComProps<T = any> extends ClassStyle {
  value?: T
  defaultValue?: T
  onChange?: (value: T, ...rest: any[]) => void
}

export as namespace ZhuxUtilReact
