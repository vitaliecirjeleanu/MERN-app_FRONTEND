import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';

import classes from './NavLinks.module.css';

const NavLinks = () => {
  const authCtx = useContext(AuthContext);
  return (
    <ul className={classes['nav-links']}>
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to={`/${authCtx.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <button onClick={authCtx.logout}>Log Out</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
