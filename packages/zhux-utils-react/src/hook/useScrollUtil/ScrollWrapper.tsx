import classNames from "classnames"
import React, { useImperativeHandle, useRef } from "react"
import { ClassStyle, IRef, WithChildren } from "../../type"
import { useWatchRefEffect } from "../effects/useWatchEffect/useWatchEffect"
import useScrollUtil, { UseScrollUtilProps } from "./useScrollUtil"

export type ScrollRef = { current: ReturnType<typeof useScrollUtil> | undefined }

export interface ScrollWrapperProps extends ClassStyle, Omit<UseScrollUtilProps, "scrollDom"> {
  scrollRef?: ScrollRef
}

const ScrollWrapper: React.FC<ScrollWrapperProps & WithChildren> = props => {
  const { scrollRef, style, className, children, ...rest } = props
  const scrollWrapper = useRef<HTMLDivElement>(null)
  const scrollChildren = useRef<HTMLDivElement>(null)

  const { scrollTo, scrollBy, getScrollInfo, scrollPixel, turnPage, autoScroll, autoTurnPage } = useScrollUtil({
    scrollDom: scrollWrapper as IRef<HTMLDivElement>,
    ...rest,
  })

  useWatchRefEffect(c => {
    if (c?.style) {
      c.style[rest.scrollType === "horizontal" ? "minWidth" : "minHeight"] = `calc(100% + ${
        (rest.reachThreshold ?? 20) + 1
      }px)`
    }
  }, scrollChildren)

  useImperativeHandle(scrollRef, () => ({
    scrollTo,
    scrollBy,
    getScrollInfo,
    scrollPixel,
    turnPage,
    autoScroll,
    autoTurnPage,
  }))

  return (
    <div className={classNames(className, "test")} style={style} ref={scrollWrapper}>
      <div ref={scrollChildren}>{children}</div>
    </div>
  )
}

export default ScrollWrapper
