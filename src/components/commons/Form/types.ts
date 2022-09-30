export type InputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    inline?: boolean;
    labelSeparator?: string;
    required?: boolean;
    onChange?: ( arg?: string | null) => void;
    /* Method used to perform validation:
     * returns true or an error message when invalid
     * false when the field is valid!
     */
    validator?: ( arg: string | null ) => boolean | string;
}

export type InputRefType = {
    isInputRefType: boolean;
    current: HTMLInputElement | HTMLTextAreaElement | null;
    checkValidity: () => (string | boolean)[];
    getValidity: () => (string | boolean)[];
}