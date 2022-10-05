

const copy2clipboard = ( text: string ) => {
    navigator.clipboard.writeText(text);
}

export { copy2clipboard }