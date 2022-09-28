export type NotificationType = {
    id?: string;
    level?: 'info' | 'warning' | 'prompt' | 'error' | 'debug';
    message: string;
    actions?: {
        label: string;
        callback: ( arg?: any ) => void
    }[];
    clearable?: boolean;
    timeout?: number;
    timestamp?: string;
}