import React, { ReactNode } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import Button from 'components/commons/Button';
import { copy2clipboard } from 'utils/commons';
import { notify, NotificationType } from 'features/ui';
import './index.scss';
import { useDispatch } from 'react-redux';

interface CodeProps {
    children: ReactNode | ReactNode[];
    className?: string;
    language?: string;
}
const Code = ( props: CodeProps ) => {
    const { children, className } = props;
    const codeRef = React.useRef<HTMLElement | null>(null);
    const dispatch = useDispatch();

    let codeClass = `${className} code`;

    React.useEffect( () => {
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [codeRef]);

    const copy = React.useCallback(() => {
        if ( codeRef.current ) {
            copy2clipboard(codeRef.current.innerText);
            let notifcation: NotificationType = {
                message: 'Code copied to clipboard!',
                level: 'info',
            }
            dispatch(notify(notifcation))
        }
    }, [codeRef, dispatch])

    return <>
        <code className={codeClass} ref={codeRef}>
            {children}
        </code>
        <Button onClick={copy} className='btn-code-copy'>Copy</Button>
    </>
}

export default Code;