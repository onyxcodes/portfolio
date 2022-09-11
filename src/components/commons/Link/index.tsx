import path from 'path';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import route from 'features/ui/route';
import { StoreState } from 'store';
import './index.scss';


// TODO: change children prop (inherited) to custom prop 'element'
// add style for pointer cursor
interface StatefulLinkProps {
    to: string;
    children: JSX.Element | string;
}

const normalizePath = (path: string) => {
  let regex = new RegExp('^\/');
  if ( path.match(regex) && path.length !== 1 ) path = path.slice(1);
  return path;
}

const addStatefulLink = (props: StatefulLinkProps) => {
    const dispatch = useDispatch();
    const { to, children } = props;
    
    const goToLink = React.useCallback(() => {
       dispatch(route(to))
    }, [to]);

	  const path = useSelector<StoreState, StoreState['ui']['path']>( s => s.ui.path );

    // TODO: consider using another hook
    const disabled = React.useMemo( () => { 
      const _to = normalizePath(to),
        _path = normalizePath(path)
      return _to === _path
    }, [to, path]);

    const getStyle = () => {
      if (disabled) return { cursor: 'not-allowed' }
      else return { cursor: 'pointer' }
    }

    const element = typeof children === 'string' ? <span>{children}</span> : children;
    const elementClass = element.props.className || '';
    const linkedEl = React.cloneElement(
      element, {
      onClick: (e: any) => {
        element.props.onClick && element.props.onClick();
        !disabled && goToLink(); 
      },
      className: disabled ? `link disabled` : `${elementClass} link`,
      style: getStyle()
    })
    return(linkedEl)
}

const Link = addStatefulLink;
export default Link;