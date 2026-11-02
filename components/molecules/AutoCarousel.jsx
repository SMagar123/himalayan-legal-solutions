"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const EFFECT_MIN_ITEMS = 3

export function AutoCarousel(props) {
  const { transition = "fade" } = props
  if (transition === "marquee") return <MarqueeCarousel {...props} />
  return transition === "slide" ? (
    <SlideCarousel {...props} />
  ) : (
    <FadeCarousel {...props} />
  )
}

function useEffectiveLoop({ count, onlyEffectWhenNeeded, loop, autoPlay }) {
  if (!onlyEffectWhenNeeded) return { loop, autoPlay }
  const hasEnoughItems = count > EFFECT_MIN_ITEMS
  return {
    loop: loop && hasEnoughItems,
    autoPlay: autoPlay && hasEnoughItems,
  }
}

function FadeCarousel({
  items,
  renderItem,
  delay = 3500,
  loop = true,
  reverse = false,
  pauseOnHover = true,
  stopOnInteraction = false,
  showControls = false,
  showDotControls = true,
  reverseControlsPosition = false,
  autoPlay = true,
  onlyEffectWhenNeeded = false,
  showGradientMask = false,
  gradientWidth = "8%",
  gradientMaskClassName,
  transitionDuration = 500,
  className,
  itemClassName,
  onSlideChange,
}) {
  const [index, setIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [userInteracted, setUserInteracted] = React.useState(false)

  const count = items.length

  const { loop: effectiveLoop, autoPlay: effectiveAutoPlay } = useEffectiveLoop(
    { count, onlyEffectWhenNeeded, loop, autoPlay }
  )

  const handleNav = React.useCallback(
    (nextIndex) => {
      setIndex(nextIndex)
      onSlideChange?.(nextIndex)
    },
    [onSlideChange]
  )

  React.useEffect(() => {
    if (!effectiveAutoPlay || count <= 1) return
    if (isPaused) return
    if (stopOnInteraction && userInteracted) return

    const timer = window.setInterval(() => {
      setIndex((current) => {
        let next

        if (reverse) {
          const atStart = current === 0
          if (atStart && !effectiveLoop) {
            window.clearInterval(timer)
            return current
          }
          next = atStart ? count - 1 : current - 1
        } else {
          const atEnd = current === count - 1
          if (atEnd && !effectiveLoop) {
            window.clearInterval(timer)
            return current
          }
          next = atEnd ? 0 : current + 1
        }

        onSlideChange?.(next)
        return next
      })
    }, delay)

    return () => window.clearInterval(timer)
  }, [
    effectiveAutoPlay,
    count,
    delay,
    isPaused,
    effectiveLoop,
    reverse,
    onSlideChange,
    stopOnInteraction,
    userInteracted,
  ])

  if (count === 0) return null

  const handleManualNav = (next) => {
    setUserInteracted(true)
    handleNav(((next % count) + count) % count)
  }

  const maskStyle = showGradientMask
    ? {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
      }
    : undefined

  const renderDots = showControls && showDotControls && count > 1 && (
    <DotControls count={count} selected={index} onSelect={handleManualNav} />
  )

  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {reverseControlsPosition && renderDots}

      <div
        className={cn("relative w-full overflow-hidden", gradientMaskClassName)}
        style={maskStyle}
      >
        {items.map((item, i) => {
          const isActive = i === index
          return (
            <div
              key={i}
              className={cn(
                "w-full transform-gpu transition-opacity ease-in-out will-change-[opacity]",
                isActive
                  ? "relative z-10 opacity-100"
                  : "pointer-events-none absolute inset-0 z-0 opacity-0",
                itemClassName
              )}
              style={{
                transitionDuration: `${transitionDuration}ms`,
              }}
            >
              {renderItem(item, i)}
            </div>
          )
        })}
      </div>

      {!reverseControlsPosition && renderDots}
    </div>
  )
}

function SlideCarousel({
  items,
  renderItem,
  delay = 3500,
  loop = true,
  reverse = false,
  pauseOnHover = true,
  stopOnInteraction = false,
  showControls = false,
  showChevronControls = true,
  showDotControls = true,
  reverseControlsPosition = false,
  autoPlay = true,
  onlyEffectWhenNeeded = false,
  showGradientMask = false,
  gradientWidth = "8%",
  gradientMaskClassName,
  className,
  itemClassName,
  onSlideChange,
}) {
  const [api, setApi] = React.useState()
  const [selected, setSelected] = React.useState(0)
  const [snapCount, setSnapCount] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const count = items.length

  const { loop: effectiveLoop, autoPlay: effectiveAutoPlay } = useEffectiveLoop(
    { count, onlyEffectWhenNeeded, loop, autoPlay }
  )

  const [plugin] = React.useState(() =>
    Autoplay({ delay, stopOnInteraction, stopOnMouseEnter: pauseOnHover })
  )

  const plugins = React.useMemo(
    () => (effectiveAutoPlay && !reverse ? [plugin] : []),
    [effectiveAutoPlay, reverse, plugin]
  )

  React.useEffect(() => {
    if (!api || !effectiveAutoPlay || !reverse) return
    if (isPaused) return

    const interval = window.setInterval(() => {
      if (api.canScrollPrev() || effectiveLoop) {
        api.scrollPrev()
      }
    }, delay)

    return () => window.clearInterval(interval)
  }, [api, effectiveAutoPlay, reverse, isPaused, delay, effectiveLoop])

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      const i = api.selectedScrollSnap()
      setSelected(i)
      onSlideChange?.(i)
    }

    const onInit = () => {
      setSnapCount(api.scrollSnapList().length)
      onSelect()
    }

    onInit()
    api.on("select", onSelect)
    api.on("reInit", onInit)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onInit)
    }
  }, [api, onSlideChange])

  const maskStyle = showGradientMask
    ? {
        WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
        maskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
      }
    : undefined

  const renderDots = showControls && showDotControls && snapCount > 1 && (
    <DotControls
      count={snapCount}
      selected={selected}
      onSelect={(i) => api?.scrollTo(i)}
    />
  )

  return (
    <Carousel
      setApi={setApi}
      opts={{
        loop: effectiveLoop,
        duration: 60,
      }}
      plugins={plugins}
      className={cn("flex w-full flex-col", className)}
      onMouseEnter={() => pauseOnHover && reverse && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && reverse && setIsPaused(false)}
    >
      {reverseControlsPosition && renderDots}

      <div className={cn(gradientMaskClassName)} style={maskStyle}>
        <CarouselContent className="-ml-1 transform-gpu ease-out will-change-transform">
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              className={cn("transform-gpu pl-4", itemClassName)}
            >
              {renderItem(item, i)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      {!reverseControlsPosition && renderDots}

      {showControls && showChevronControls && snapCount > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}

function MarqueeCarousel({
  items,
  renderItem,
  reverse = false,
  pauseOnHover = true,
  stopOnInteraction = false,
  autoPlay = true,
  onlyEffectWhenNeeded = false,
  showGradientMask = true,
  gradientWidth = "8%",
  gradientMaskClassName,
  className,
  itemClassName,
  marqueeSpeed = 40,
  marqueeGap = "1rem",
  draggable = true,
}) {
  const scrollerRef = React.useRef(null)
  const singleSetWidthRef = React.useRef(0)
  const directionRef = React.useRef(reverse ? -1 : 1)
  const isHoverPausedRef = React.useRef(false)
  const isUserInteractingRef = React.useRef(false)
  const permanentlyStoppedRef = React.useRef(false)
  const resumeTimeoutRef = React.useRef(undefined)
  const dragStateRef = React.useRef(null)
  const suppressClickRef = React.useRef(false)

  const stopOnInteractionRef = React.useRef(stopOnInteraction)
  React.useEffect(() => {
    stopOnInteractionRef.current = stopOnInteraction
  }, [stopOnInteraction])

  const count = items.length

  const { autoPlay: effectiveAutoPlay } = useEffectiveLoop({
    count,
    onlyEffectWhenNeeded,
    loop: true,
    autoPlay,
  })

  const shouldDuplicate = onlyEffectWhenNeeded ? count > EFFECT_MIN_ITEMS : true
  const isStatic = !shouldDuplicate

  const renderItems = shouldDuplicate ? [...items, ...items, ...items] : items

  React.useEffect(() => {
    directionRef.current = reverse ? -1 : 1
  }, [reverse])

  React.useEffect(() => {
    const node = scrollerRef.current
    if (!node || count === 0) return

    const measure = () => {
      const singleSetWidth = shouldDuplicate
        ? node.scrollWidth / 3
        : node.scrollWidth
      singleSetWidthRef.current = singleSetWidth

      if (!dragStateRef.current && shouldDuplicate) {
        node.scrollLeft =
          singleSetWidth + (node.scrollLeft % singleSetWidth || 0)
        if (node.scrollLeft < singleSetWidth * 0.1) {
          node.scrollLeft = singleSetWidth
        }
      }
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(node)
    return () => ro.disconnect()
  }, [count, items, shouldDuplicate])

  React.useEffect(() => {
    const node = scrollerRef.current
    if (!node || count === 0) return

    let raf
    let lastTime = null

    const tick = (time) => {
      raf = requestAnimationFrame(tick)

      const singleSetWidth = singleSetWidthRef.current
      if (singleSetWidth <= 0) {
        lastTime = time
        return
      }

      const dt = lastTime === null ? 0 : (time - lastTime) / 1000
      lastTime = time

      const shouldAutoScroll =
        effectiveAutoPlay &&
        !isHoverPausedRef.current &&
        !isUserInteractingRef.current &&
        !dragStateRef.current &&
        !(stopOnInteraction && permanentlyStoppedRef.current)

      if (shouldAutoScroll && dt > 0 && shouldDuplicate) {
        node.scrollLeft += directionRef.current * marqueeSpeed * dt
      }

      if (shouldDuplicate) {
        if (node.scrollLeft < singleSetWidth * 0.5) {
          node.scrollLeft += singleSetWidth
        } else if (node.scrollLeft > singleSetWidth * 1.5) {
          node.scrollLeft -= singleSetWidth
        }
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [
    effectiveAutoPlay,
    count,
    marqueeSpeed,
    stopOnInteraction,
    shouldDuplicate,
  ])

  React.useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [])

  const clearResumeTimeout = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current)
      resumeTimeoutRef.current = undefined
    }
  }

  const registerInteraction = React.useCallback(() => {
    if (stopOnInteractionRef.current) {
      permanentlyStoppedRef.current = true
      return
    }
    isUserInteractingRef.current = true
    clearResumeTimeout()
    resumeTimeoutRef.current = window.setTimeout(() => {
      isUserInteractingRef.current = false
    }, 1200)
  }, [])

  // Only attach wheel listener if draggable is true and we are in a scrolling state
  React.useEffect(() => {
    const node = scrollerRef.current
    if (!node || !draggable || isStatic) return

    const wheelHandler = (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        node.scrollLeft += e.deltaY
        e.preventDefault()
      }
      registerInteraction()
    }

    node.addEventListener("wheel", wheelHandler, { passive: false })
    return () => node.removeEventListener("wheel", wheelHandler)
  }, [registerInteraction, draggable, isStatic])

  if (count === 0) return null

  const maskStyle =
    showGradientMask && !isStatic
      ? {
          WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
          maskImage: `linear-gradient(to right, transparent 0%, black ${gradientWidth}, black calc(100% - ${gradientWidth}), transparent 100%)`,
        }
      : undefined

  const handlePointerDown = (e) => {
    if (!draggable || isStatic) return

    const interactive = e.target.closest(
      'a, button, input, textarea, select, [role="button"], [data-no-drag]'
    )
    if (interactive) return

    const node = scrollerRef.current
    if (!node) return

    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: node.scrollLeft,
      dragged: false,
    }
    node.setPointerCapture(e.pointerId)
    registerInteraction()
  }

  const handlePointerMove = (e) => {
    if (!draggable || isStatic) return
    const drag = dragStateRef.current
    const node = scrollerRef.current
    if (!drag || !node || drag.pointerId !== e.pointerId) return

    const dx = e.clientX - drag.startX
    if (Math.abs(dx) > 6) drag.dragged = true
    node.scrollLeft = drag.startScrollLeft - dx
  }

  const endDrag = (e) => {
    if (!draggable || isStatic) return
    const drag = dragStateRef.current
    if (!drag || drag.pointerId !== e.pointerId) return

    const dx = e.clientX - drag.startX
    const wasRealDrag = drag.dragged && Math.abs(dx) > 6

    if (wasRealDrag) {
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 0)
    }

    dragStateRef.current = null
    registerInteraction()
  }

  const handleClickCapture = (e) => {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div
      className={cn("relative flex w-full flex-col", className)}
      // Removed the hover pause triggers when the carousel is static
      onMouseEnter={() =>
        !isStatic && pauseOnHover && (isHoverPausedRef.current = true)
      }
      onMouseLeave={() =>
        !isStatic && pauseOnHover && (isHoverPausedRef.current = false)
      }
    >
      <style>{`
        .auto-carousel-marquee-track::-webkit-scrollbar { display: none; }
        .auto-carousel-marquee-track { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div
        className={cn(
          "relative w-full py-16 lg:py-20",
          // Allow normal scrolling if it's static and small screens might overflow
          isStatic ? "overflow-x-auto" : "overflow-hidden",
          gradientMaskClassName
        )}
        style={maskStyle}
      >
        <div
          ref={scrollerRef}
          data-lenis-prevent={!isStatic || undefined}
          className={cn(
            "auto-carousel-marquee-track flex w-full",
            !isStatic && "overflow-hidden",
            // Center the items if the carousel is static (1-3 items)
            isStatic && "min-w-full justify-center",
            draggable &&
              !isStatic &&
              "cursor-grab touch-pan-x select-none active:cursor-grabbing"
          )}
          style={{ gap: marqueeGap, scrollBehavior: "auto" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={handleClickCapture}
        >
          {renderItems.map((item, i) => (
            <div
              key={i}
              aria-hidden={shouldDuplicate && i >= count ? true : undefined}
              className={cn("shrink-0", itemClassName)}
            >
              {renderItem(item, i % count)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function DotControls({ count, selected, onSelect }) {
  return (
    <div className="my-4 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={cn(
            "h-2 w-2 rounded-full transition-colors",
            i === selected ? "bg-primary-red" : "bg-black"
          )}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}
