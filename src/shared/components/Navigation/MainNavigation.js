import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import classes from './MainNavigation.module.css';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => setDrawerIsOpen(true);
  const closeDrawerHandler = () => setDrawerIsOpen(false);

  return (
    <Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className={classes['main-navigation__drawer-nav']}>
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className={classes['main-navigation__menu-btn']}
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes['main-navigation__title']}>
          <Link to="/">Your Places</Link>
        </h1>
        <nav className={classes['main-navigation__header-nav']}>
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
