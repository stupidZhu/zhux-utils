import { useCallback, useEffect, useRef } from "react"
import { ITimer } from "zhux-utils/dist/type"
import { IRef } from "../../type"
import { getCurrent } from "../../util"
import { useWatchRefEffect } from "../effects/useWatchEffect/useWatchEffect"

// offsetWidth/offsetHeight：scrollWrapper 宽高
// scrollHeight/scrollWidth：scrollChildren 宽高
// scrollTop/scrollLeft: scroll offset

export type ScrollInfo = {
  offsetWidth: number
  offsetHeight: number
  scrollHeight: number
  scrollLeft: number
  scrollTop: number
  scrollWidth: number
}

export interface UseScrollUtilProps {
  scrollType: "horizontal" | "vertical"
  scrollDom: IRef<HTMLElement>
  reachThreshold?: number
  onScroll?: (info: ScrollInfo, e: any) => void
  onReach?: (type: "top" | "bottom" | "left" | "right", info: ScrollInfo, e: any) => void
}

const useScrollUtil = (props: UseScrollUtilProps) => {
  const { scrollType = "vertical", scrollDom, reachThreshold = 20, onScroll, onReach } = props
  const reachSwitch = useRef(true)
  const isFirstReach = useRef(true)
  const timerRef = useRef<ITimer>(null)
  const hoverFlag = useRef(false)

  const getScrollInfo = useCallback(() => {
    const {
      offsetWidth = 0,
      offsetHeight = 0,
      scrollHeight = 0,
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
    } = getCurrent(scrollDom) ?? {}
    return { offsetWidth, offsetHeight, scrollHeight, scrollLeft, scrollTop, scrollWidth }
  }, [])

  const scrollTo = useCallback((option: ScrollToOptions) => {
    const dom = getCurrent(scrollDom)
    if (!dom) return
    dom.scrollTo({ behavior: "smooth", ...option })
  }, [])

  const scrollBy = useCallback((option: ScrollToOptions) => {
    const dom = getCurrent(scrollDom)
    if (!dom) return
    dom.scrollBy({ behavior: "smooth", ...option })
  }, [])

  const scrollPixel = useCallback(
    (type: "prev" | "next", pixel = 20) => {
      const behavior: ScrollToOptions = pixel < 5 ? { behavior: "auto" } : {}
      if (scrollType === "horizontal") scrollBy({ left: type === "next" ? pixel : -pixel, ...behavior })
      else scrollBy({ top: type === "next" ? pixel : -pixel, ...behavior })
    },
    [scrollBy, scrollType]
  )

  const turnPage = useCallback(
    (type: "prev" | "next", holdPixel = 20) => {
      if (scrollType === "horizontal") {
        const { offsetWidth } = getScrollInfo()
        scrollBy({ left: type === "next" ? offsetWidth - holdPixel : holdPixel - offsetWidth })
      } else {
        const { offsetHeight } = getScrollInfo()
        scrollBy({ top: type === "next" ? offsetHeight - holdPixel : holdPixel - offsetHeight })
      }
    },
    [getScrollInfo, scrollBy, scrollType]
  )

  const autoScroll: (interval?: number, speed?: number) => () => void = useCallback(
    (interval = 100, speed = 1) => {
      speed = Math.max(speed || 0, 1)
      timerRef.current && clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        if (hoverFlag.current) return
        const { scrollLeft, scrollTop, scrollWidth, offsetWidth, scrollHeight, offsetHeight } = getScrollInfo()
        if (scrollType === "horizontal" && scrollLeft + 1 >= scrollWidth - offsetWidth) {
          clearInterval(timerRef.current!)
          setTimeout(() => {
            const { scrollLeft, scrollWidth, offsetWidth } = getScrollInfo()
            if (scrollLeft + 1 >= scrollWidth - offsetWidth) {
              scrollTo({ left: 0 })
              setTimeout(() => autoScroll(interval, speed), 1000)
            } else autoScroll(interval, speed)
          }, 1000)
        } else if (scrollType === "vertical" && scrollTop + 1 >= scrollHeight - offsetHeight) {
          clearInterval(timerRef.current!)
          setTimeout(() => {
            const { scrollTop, offsetHeight, scrollHeight } = getScrollInfo()
            if (scrollTop + 1 >= scrollHeight - offsetHeight) {
              scrollTo({ top: 0 })
              setTimeout(() => autoScroll(interval, speed), 1000)
            } else autoScroll(interval, speed)
          }, 1000)
        } else scrollPixel("next", speed)
      }, interval)
      return () => {
        timerRef.current && clearInterval(timerRef.current)
        timerRef.current = null
      }
    },
    [getScrollInfo, scrollType, scrollPixel, scrollTo]
  )

  const autoTurnPage: (interval?: number, holdPixel?: number) => () => void = useCallback(
    (interval = 5000, holdPixel = 20) => {
      timerRef.current && clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        if (hoverFlag.current) return
        const { scrollLeft, scrollTop, offsetWidth, offsetHeight, scrollHeight, scrollWidth } = getScrollInfo()
        if (scrollType === "horizontal" && scrollLeft + 1 >= scrollWidth - offsetWidth) {
          clearInterval(timerRef.current!)
          setTimeout(() => {
            const { scrollLeft, offsetWidth, scrollWidth } = getScrollInfo()
            if (scrollLeft + 1 >= scrollWidth - offsetWidth) {
              scrollTo({ left: 0 })
              setTimeout(() => autoTurnPage(interval), 1000)
            } else autoTurnPage(interval)
          }, 1000)
        } else if (scrollType === "vertical" && scrollTop + 1 >= scrollHeight - offsetHeight) {
          clearInterval(timerRef.current!)
          setTimeout(() => {
            const { scrollTop, offsetHeight, scrollHeight } = getScrollInfo()
            if (scrollTop + 1 >= scrollHeight - offsetHeight) {
              scrollTo({ top: 0 })
              setTimeout(() => autoTurnPage(interval), 1000)
            } else autoTurnPage(interval)
          }, 1000)
        } else turnPage("next", holdPixel)
      }, interval)
      return () => {
        timerRef.current && clearInterval(timerRef.current)
        timerRef.current = null
      }
    },
    [getScrollInfo, scrollTo, scrollType, turnPage]
  )

  const handleScroll = useCallback(
    (e: any) => {
      const { offsetWidth, offsetHeight, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.target as HTMLElement
      const info = { offsetWidth, offsetHeight, scrollHeight, scrollLeft, scrollTop, scrollWidth }
      onScroll?.(info, e)
      if (!onReach) return
      if (scrollType === "horizontal") {
        if (offsetWidth + scrollLeft + reachThreshold >= scrollWidth && reachSwitch.current) {
          onReach("right", info, e)
          reachSwitch.current = false
        }
        if (scrollLeft <= reachThreshold && reachSwitch.current && !isFirstReach.current) {
          onReach("left", info, e)
          reachSwitch.current = false
        }
        if (offsetWidth + scrollLeft + reachThreshold < scrollWidth && scrollLeft > reachThreshold) {
          isFirstReach.current = false
          reachSwitch.current = true
        }
      } else {
        // offsetHeight + scrollTop + reachThreshold 滚动距离+容器高度+缓冲高度>滚动内容高度
        if (offsetHeight + scrollTop + reachThreshold >= scrollHeight && reachSwitch.current) {
          onReach("bottom", info, e)
          reachSwitch.current = false
        }
        if (scrollTop <= reachThreshold && reachSwitch.current && !isFirstReach.current) {
          onReach("top", info, e)
          reachSwitch.current = false
        }
        if (offsetHeight + scrollTop + reachThreshold < scrollHeight && scrollTop > reachThreshold) {
          isFirstReach.current = false
          reachSwitch.current = true
        }
      }
    },
    [onReach, onScroll, reachThreshold, scrollType]
  )

  const onMouseEnter = useCallback(() => (hoverFlag.current = true), [])
  const onMouseLeave = useCallback(() => (hoverFlag.current = false), [])

  useWatchRefEffect((el, prevEl) => {
    if (el) {
      el.style.overflow = "auto"
      el.addEventListener("scroll", handleScroll)
      el.addEventListener("mouseenter", onMouseEnter)
      el.addEventListener("mouseleave", onMouseLeave)
      el.addEventListener("touchstart", onMouseEnter)
      el.addEventListener("touchend", onMouseLeave)
      el.addEventListener("touchcancel", onMouseLeave)
    }
    if (prevEl) {
      prevEl.removeEventListener("scroll", handleScroll)
      prevEl.removeEventListener("mouseenter", onMouseEnter)
      prevEl.removeEventListener("mouseleave", onMouseLeave)
      prevEl.removeEventListener("touchstart", onMouseEnter)
      prevEl.removeEventListener("touchend", onMouseLeave)
      prevEl.removeEventListener("touchcancel", onMouseLeave)
    }
  }, scrollDom)
  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [scrollType])

  return { scrollTo, scrollBy, getScrollInfo, scrollPixel, turnPage, autoScroll, autoTurnPage }
}

export default useScrollUtil
