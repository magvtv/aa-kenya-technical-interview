import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  type: ToastType
  message: string
}

// Module-level state — singleton so any component shares the same toast list
const toasts = ref<Toast[]>([])
let nextId = 0

const DURATION = 4000

function addToast(type: ToastType, message: string) {
  const id = nextId++
  toasts.value.push({ id, type, message })
  setTimeout(() => removeToast(id), DURATION)
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

export function useToast() {
  return {
    toasts,
    success: (message: string) => addToast('success', message),
    error: (message: string) => addToast('error', message),
    info: (message: string) => addToast('info', message),
    dismiss: (id: number) => removeToast(id),
  }
}
