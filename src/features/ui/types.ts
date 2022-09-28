export type NotificationType = {
    id?: string;
    level?: 'info' | 'warning' | 'prompt' | 'error' | 'debug';
    message: string;
    actions?: {
        label: string;
        // May be a redux action payload.. ;)
        payload?: {[key: string]: any};
        globalFnName: string;
    }[];
    clearable?: boolean;
    timeout?: number;
    timestamp?: string;
}