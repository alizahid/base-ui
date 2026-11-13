import { Toast } from '@base-ui/react/toast'

// one manager for the whole app, so a toast can be added from anywhere:
// toast.add({ title }), toast.promise(...), toast.update(...), toast.close(id)
export const toast = Toast.createToastManager()
