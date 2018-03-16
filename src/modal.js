import { Controller } from "@hotwired/stimulus"
import { enter, leave } from "./transition"

export default class extends Controller {
  static targets = ['container', 'background']
  static values = {
    open: { type: Boolean, default: false },
    restoreScroll: { type: Boolean, default: true }
  }

  disconnect() {
    this.close()
  }

  open() {
    this.openValue = true
  }

  close() {
    this.openValue = false
  }

  closeBackground(event) {
    if (event.target === this.backgroundTarget) this.close()
  }

  openValueChanged() {
    if (this.openValue) {
      this.containerTarget.focus()
      this.lockScroll()
      enter(this.backgroundTarget)
      enter(this.containerTarget)
    } else {
      this.unlockScroll()
      leave(this.containerTarget)
      leave(this.backgroundTarget)
    }
  }

  lockScroll() {
    // Add right padding to the body so the page doesn't shift
    // when we disable scrolling
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollbarWidth}px`

    // Add classes to body to fix its position
    document.body.classList.add('fixed', 'inset-x-0', 'overflow-hidden')

    if (this.restoreScrollValue) {
      // Save the scroll position
      this.saveScrollPosition()

      // Add negative top position in order for body to stay in place
      document.body.style.top = `-${this.scrollPosition}px`
    }
  }

  unlockScroll() {
    // Remove tweaks for scrollbar
    document.body.style.paddingRight = null;

    // Remove classes from body to unfix position
    document.body.classList.remove('fixed', 'inset-x-0', 'overflow-hidden')

    // Restore the scroll position of the body before it got locked
    if (this.restoreScrollValue) {
      this.restoreScrollPosition()

      // Remove the negative top inline style from body
      document.body.style.top = null
    }
  }

  saveScrollPosition() {
    this.scrollPosition = window.pageYOffset || document.body.scrollTop
  }

  restoreScrollPosition() {
    if (this.scrollPosition === undefined) return
    document.documentElement.scrollTop = this.scrollPosition
  }
}
