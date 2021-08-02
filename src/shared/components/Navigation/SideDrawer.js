import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import classes from './SideDrawer.module.css';

const SideDrawer = props => {
  const drawer = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={classes['side-drawer']} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(drawer, document.getElementById('drawer'));
};

export default SideDrawer;
