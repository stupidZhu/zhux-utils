export type WithChildren = { children?: React.ReactNode | undefined }
export type LikeNull = undefined | null

export type IRef<T> = (() => T | LikeNull) | React.MutableRefObject<T | LikeNull> | React.RefObject<T | LikeNull>

export interface ClassStyle {
  className?: string
  style?: React.CSSProperties
}

export interface CtrlProps<T = unknown> {
  value?: T
  defaultValue?: T
  onChange?: (value: T, ...rest: any[]) => void
}

export type CommonComProps<T = any> = CtrlProps<T> & ClassStyle

export as namespace ZhuxUtilReact
