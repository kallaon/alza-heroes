export enum ToastType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}

export interface Toast {
    message: string;
    type: ToastType;
    id: number;
}
