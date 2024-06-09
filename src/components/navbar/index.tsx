/* eslint-disable @next/next/no-img-element */
"use client";

import classNames from "classnames";
import styles from "./navbar.module.scss"
import { navigationBottom, navigationTop } from "@/staticData"
function Navbar() {
  return (
    <header className={styles.navigationBar}>
      <div className={styles.logo}>
        <div className={styles.image}/>
      </div>
      <div className={classNames(styles.mainMenu, styles.menus)}>
        <span>Menu</span>
        <ul>
          {
            navigationTop.map((item)=> <li key={item.name}><span>{<item.logo/>}</span>{item.name}</li>)
          }
        </ul>
      </div>
      <div className={classNames(styles.subMenu, styles.menus)}>
        <span>Others</span>
        <ul>
          {
            navigationBottom.map((item)=> <li key={item.name}><span>{<item.logo/>}</span>{item.name}</li>)
          }
        </ul>
      </div>


    </header>
  )
}

export default Navbar