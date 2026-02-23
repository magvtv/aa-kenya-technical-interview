<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, dismiss } = useToast()

const icons = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`,
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast" tag="div" class="toast-stack">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['toast', `toast--${toast.type}`]"
          role="alert"
        >
          <span class="toast__icon" v-html="icons[toast.type]" />
          <p class="toast__message">{{ toast.message }}</p>
          <button class="toast__close" @click="dismiss(toast.id)" aria-label="Dismiss">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.toast-stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.08),
    0 2px 4px -2px rgb(0 0 0 / 0.06),
    0 0 0 1px rgb(0 0 0 / 0.06);
  min-width: 280px;
  max-width: 380px;
  pointer-events: all;
  cursor: default;
}

/* type accents */
.toast--success .toast__icon { color: #16a34a; }
.toast--error   .toast__icon { color: #dc2626; }
.toast--info    .toast__icon { color: #4f46e5; }

.toast--success { border-left: 3px solid #16a34a; }
.toast--error   { border-left: 3px solid #dc2626; }
.toast--info    { border-left: 3px solid #4f46e5; }

.toast__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.toast__message {
  flex: 1;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  color: #111827;
}

.toast__close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0.125rem;
  border-radius: 0.25rem;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.toast__close:hover {
  color: #374151;
  background: #f3f4f6;
}

/* Transition animations */
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.21, 1.02, 0.73, 1);
}

.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.06, 0.71, 0.55, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(calc(100% + 1.5rem));
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(calc(100% + 1.5rem));
}

.toast-move {
  transition: transform 0.25s ease;
}
</style>
