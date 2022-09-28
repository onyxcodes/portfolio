const globalFunctions: {
    [key: string]: (...args: any[]) => void;
} = {
    test: (notificationId: string) => {
        console.log('Called test action for notification with id:',
            notificationId
        );
    }
}

export { globalFunctions };