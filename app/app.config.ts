export default defineAppConfig({
  ui: {
    colors: {
      primary: 'teal',
      secondary: 'amber',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: 'font-medium transition-all duration-200 rounded-lg'
      },
      defaultVariants: {
        color: 'primary'
      }
    },
    card: {
      slots: {
        root: 'rounded-xl'
      }
    },
    input: {
      slots: {
        root: 'rounded-lg overflow-hidden',
        base: 'rounded-lg transition-all duration-200'
      }
    },
    textarea: {
      slots: {
        root: 'rounded-lg overflow-hidden',
        base: 'rounded-lg transition-all duration-200'
      }
    },
    selectMenu: {
      slots: {
        base: 'rounded-lg',
        input: 'rounded-lg'
      }
    },
    badge: {
      slots: {
        base: 'rounded-full'
      },
      defaultVariants: {
        variant: 'subtle'
      }
    },
    avatar: {
      slots: {
        root: 'ring-2 ring-white dark:ring-zinc-900'
      }
    },
    modal: {
      slots: {
        content: 'shadow-elevated rounded-xl overflow-hidden'
      }
    },
    alert: {
      slots: {
        root: 'rounded-lg'
      }
    }
  }
})
