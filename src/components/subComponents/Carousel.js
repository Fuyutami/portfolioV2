import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react"
import styled from "styled-components"

import { degrees_to_radians, euclideanDistance } from "../../other/utils"

const Canvas = styled.canvas`
  background-color: transparent;
`

const Carousel = forwardRef((props, ref) => {
  const canvasRef = useRef(null)
  const requestIdRef = useRef(null)
  const stateRef = useRef({
    size: {
      width: props.width || 180,
      height: undefined,
    },
    angle: props.angle || 0,
    pivot: { x: 100, y: 400 },
    constantSpeed: props.speed || 1, // px/frame
    speed: props.speed || 1,
    maxSpeed: 30,
    acceleration: 0.8,
    vertical: props.vertical || false,
    padding: 5,
    imageWidth: 80,
    colorInactive: props.colors.inactive || "grey",
    colorActive: props.colors.active || "green",
    colorBackground: props.colors.background || "white",
    items: props.images.map((_, idx) => {
      return {
        x: 0,
        y: props.width * idx,
        w: props.width,
        h: props.width,
        image: undefined,
      }
    }),
    mode: "free",
    click: {
      start: { x: undefined, y: undefined },
      on: { x: undefined, y: undefined },
    },
    clickThreshold: 50,
    drag: {
      from: { x: undefined, y: undefined },
      to: { x: undefined, y: undefined },
    },
    selected: null,
  })

  useImperativeHandle(ref, () => ({
    releaseCarousel() {
      stateRef.current.selected = null
      stateRef.current.mode = "free"
    },

    selectItem(itemID) {
      stateRef.current.selected = itemID
      handleSelect(stateRef.current.selected, props.callback)
      stateRef.current.mode = "userSelected"
    },
  }))

  const update = (state) => {
    switch (state.mode) {
      case "idle":
        return
      case "userControlled":
        let increment = state.drag.from.y - state.drag.to.y
        if (Math.abs(increment) > state.maxSpeed)
          increment = (state.maxSpeed * increment) / Math.abs(increment)
        state.speed = -increment

        if (increment < 0) {
          moveForward(state)
        }
        if (increment > 0) {
          moveBackwards(state)
        }
        state.drag.from.y = state.drag.to.y
        return
      case "userSelected":
        // move selected item to pivot point
        const diff =
          state.pivot.y - state.items[state.selected].y + state.size.width
        const behind = diff > 0
        state.speed = 6

        if (Math.abs(diff) < state.speed) {
          state.mode = "breaking"
        }

        if (behind) {
          moveForward(state)
        } else {
          state.speed = -6
          moveBackwards(state)
        }
        return
      case "free":
        // return speed to constant speed
        if (state.speed < state.constantSpeed)
          state.speed =
            Math.round((state.speed + state.acceleration) * 1000) / 1000
        if (state.speed > state.constantSpeed)
          state.speed =
            Math.round((state.speed - state.acceleration) * 1000) / 1000

        if (state.speed > 0) moveForward(state)
        if (state.speed < 0) moveBackwards(state)
        return
      case "breaking":
        if (state.speed === 0) state.mode = "idle"
        stop(state)
        if (state.speed > 0) moveForward(state)
        if (state.speed < 0) moveBackwards(state)
        return
      default:
        console.error("state error!")
        return
    }
  }

  useEffect(() => {
    console.log("size from the carousel: " + props.width)
  }, [props.width])

  const animate = () => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext("2d")
    const state = stateRef.current

    update(state)
    draw(ctx, state)

    requestIdRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    // event handlers
    const handlePointerEnter = () => {}
    const handlePointerExit = (e) => {
      if (stateRef.current.mode === "userControlled")
        stateRef.current.mode = "free"
    }
    const handlePointerDown = (e) => {
      e.preventDefault()
      stateRef.current.mode = "userControlled"
      if (stateRef.current.selected !== null) {
        stateRef.current.selected = null
        handleSelect(null, props.callback)
      }
      stateRef.current.click.start = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
      }
      stateRef.current.drag.from = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
      }
    }

    const handlePointerUp = (e) => {
      const clientX = e.clientX || e.changedTouches[0].clientX
      const clientY = e.clientY || e.changedTouches[0].clientY
      const angle = degrees_to_radians(stateRef.current.angle)
      let x = clientX
      let y = clientY
      const xStart = stateRef.current.click.start.x
      const yStart = stateRef.current.click.start.y
      const threshold = stateRef.current.clickThreshold

      if (
        yStart - threshold < y &&
        y < yStart + threshold &&
        xStart - threshold < x &&
        x < xStart + threshold
      ) {
        const rect = canvasRef.current.getBoundingClientRect()
        y -= rect.top
        x -= rect.left + Math.sin(angle) * stateRef.current.size.height
        const point = {
          x: x * Math.cos(angle) + y * Math.sin(angle),
          y: x * -Math.sin(angle) + y * Math.cos(angle),
        }
        let distances = []
        stateRef.current.items.forEach((item, idx) => {
          const center = { x: item.x + item.w / 2, y: item.y + item.h / 2 }
          const distance = euclideanDistance(point, center)
          distances.push(distance)
        })
        stateRef.current.selected = distances.indexOf(Math.min(...distances))
        handleSelect(stateRef.current.selected, props.callback)
        stateRef.current.mode = "userSelected"
      } else {
        stateRef.current.mode = "free"
      }
    }

    const handlePointerMove = (e) => {
      e.preventDefault()
      stateRef.current.drag.to = {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
      }
    }

    // define canvas size
    stateRef.current.size.height =
      stateRef.current.size.width * props.images.length

    // Load images and start animating
    loadImages(props.images, (images) => {
      stateRef.current.items.forEach((item, idx) => {
        item.image = images[idx]
      })
      requestIdRef.current = requestAnimationFrame(animate)
    })

    // add event listeners
    const canvas = canvasRef.current
    canvas.addEventListener("pointerdown", handlePointerDown)
    canvas.addEventListener("pointerup", handlePointerUp)
    canvas.addEventListener("pointerenter", handlePointerEnter)
    canvas.addEventListener("pointerleave", handlePointerExit)
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("touchstart", handlePointerDown, { passive: false })
    canvas.addEventListener("touchend", handlePointerUp, { passive: false })
    canvas.addEventListener("touchmove", handlePointerMove, { passive: false })

    return () => {
      cancelAnimationFrame(requestIdRef.current)
      canvas.removeEventListener("pointerdown", handlePointerDown)
      canvas.removeEventListener("pointerup", handlePointerUp)
      canvas.removeEventListener("pointerenter", handlePointerEnter)
      canvas.removeEventListener("pointerleave", handlePointerExit)
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("touchstart", handlePointerDown)
      canvas.removeEventListener("touchend", handlePointerUp)
      canvas.removeEventListener("touchmove", handlePointerMove)
    }
  }, [])

  return <Canvas {...stateRef.current.size} ref={canvasRef} />
})

const loadImages = (urls, callback) => {
  let imgArr = []
  urls.forEach((url, idx) => {
    const img = new Image()
    img.onload = () => {
      imgArr.push(img)
      if (imgArr.length === urls.length) callback(imgArr)
    }
    img.src = url
  })
}

const draw = (ctx, state) => {
  if (state.mode === "idle") return
  const { width, height } = state.size
  const cellPad = state.padding

  // clear canvas
  ctx.clearRect(0, 0, state.size.width, state.size.height)
  // draw cells
  ctx.fillStyle = state.colorInactive

  state.items.forEach((item, idx) => {
    //draw cell
    ctx.fillStyle =
      state.selected === idx ? state.colorActive : state.colorInactive

    const x = state.items[idx].x + cellPad
    const y = state.items[idx].y + cellPad
    const w = state.items[idx].w - 2 * cellPad
    const h = state.items[idx].h - 2 * cellPad
    ctx.fillRect(x, y, w, h)

    // draw image
    const xImg = state.size.width / 2 - state.imageWidth / 2
    const yImg = y + state.size.width / 2 - state.imageWidth / 2
    const wImg = state.imageWidth
    const hImg = state.imageWidth
    ctx.drawImage(item.image, xImg, yImg, wImg, hImg)
  })

  //draw frame
  ctx.lineWidth = 10
  ctx.strokeStyle = state.colorBackground
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(width, 0)
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.lineTo(0, 0)
  ctx.stroke()
}

const handleSelect = (selected, callback) => {
  callback(selected)
}

const moveForward = (state) => {
  const speed = state.speed
  state.items.forEach((item) => {
    if (item.y + speed <= state.size.height - state.size.width) {
      item.y += speed
    } else {
      item.y = item.y - state.size.height + speed
    }
  })
}

const moveBackwards = (state) => {
  const speed = state.speed
  state.items.forEach((item) => {
    if (item.y + speed >= -state.size.width) {
      item.y += speed
    } else {
      item.y = item.y + speed + state.size.height
    }
  })
}

const stop = (state) => {
  if (state.speed === 0) return
  if (state.speed < 0) state.speed += state.acceleration
  if (state.speed > 0) state.speed -= state.acceleration
  if (Math.abs(state.speed) < state.acceleration) state.speed = 0
}

export default Carousel
