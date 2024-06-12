/* eslint-disable @next/next/no-img-element */
"use client";

import classNames from "classnames";
import styles from "./navbar.module.scss"
import { navigationBottom, navigationTop } from "@/staticData"
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { useEffect } from "react";
import * as NavigationActions from '@/store/actions/navigation';
import { toast } from "react-hot-toast";
import { IconType } from "react-icons";
function Navbar() {
  const dispatch = useAppDispatch();
  const { location: current } = useAppSelector(
    (state) => state.Navigation
  );

  const clickFunction = (item: { name: string; logo: IconType; }) => {
    if (current === item.name) return
    dispatch({type: NavigationActions.SET_NAVIGATION, payload: {location: item.name}})
    toast("Not implemented yet")
  
  }

  return (
    <div className={styles.navbarContainer}>
      <header className={styles.navigationBar}>
      <div className={styles.logo}>
        <div className={styles.image}/>
      </div>
      <div className={classNames(styles.mainMenu, styles.menus)}>
        <span>Menu</span>
        <ul>
          {
            navigationTop.map((item)=> <li className={classNames({
              [styles.active]: current === item.name
            })} 
            onClick={() => clickFunction(item)}
            key={item.name}><span>{<item.logo/>}</span>{item.name}</li>)
          }
        </ul>
      </div>
      <div className={classNames(styles.subMenu, styles.menus)}>
        <span>Others</span>
        <ul>
          {
            navigationBottom.map((item)=> <li className={classNames({
              [styles.active]: current === item.name
            })}
            onClick={() => clickFunction(item)}
            key={item.name}><span>{<item.logo/>}</span>{item.name}</li>)
          }
        </ul>
      </div>
    </header>
    </div>
  )
}

export default Navbar