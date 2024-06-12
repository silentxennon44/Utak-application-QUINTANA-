"use client";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./slider.module.scss"
import { useState, useRef } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import * as CategoryActions from '@/store/actions/categories';
import { throttle } from "lodash-es";

const Slider = ({ tabs }: { tabs: string[] }) => {
  const dispatch = useAppDispatch();
  const { category: current } = useAppSelector(
    (state) => state.Category
  );
  const tabsBoxRef = useRef<HTMLUListElement>(null);
  const leftArrow = useRef<HTMLElement>(null);
  const rightArrow = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleIcons = (scrollVal: number) => {
    const tabsBox = tabsBoxRef.current!;
    const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    leftArrow.current!.parentElement!.style.display = scrollVal <= 0 ? "none" : "flex";
    rightArrow.current!.parentElement!.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

  const handleArrowClick = (direction: string) => {
    const tabsBox = tabsBoxRef.current!;
    const scrollWidth = tabsBox.scrollLeft += direction === "left" ? -340 : 340;
    handleIcons(scrollWidth);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: { movementX: number; }) => {
    const tabsBox = tabsBoxRef.current!;
    if (isDragging){;
      tabsBox.classList.add(styles.dragging);
      tabsBox.scrollLeft -= e.movementX;
      handleIcons(tabsBox.scrollLeft);
    } else {
      tabsBox.classList.remove(styles.dragging);
    }
  };

  const handleTabClick = (tab: string) => {
    dispatch({type: CategoryActions.SET_CATEGORY, payload: {category: tab}})

  };

  const throttledHandleScroll = throttle((deltaY) => {
    const tabsBox = tabsBoxRef.current;
    if (tabsBox) {
        tabsBox.scrollLeft += deltaY;
        handleIcons(tabsBox.scrollLeft);
    }
}, 100);

  const horizontalScroll = (evt: { deltaY: any; }) => {
    if (isDragging) return; 
    const deltaY = evt.deltaY;

    const tabsBox = tabsBoxRef.current;
    if (tabsBox) {
        throttledHandleScroll(deltaY);
    }

  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} onClick={() => handleArrowClick("left")}>
        <i ref={leftArrow}><FaAngleLeft /></i>
      </div>
       <ul
        className={styles.tabsBox}
        ref={tabsBoxRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={horizontalScroll}
      >
        {tabs?.map((tab, index) => (
          <li
            key={index}
            className={classNames(styles.tab, {
              [styles.active]: current === tab
            })}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className={styles.icon} onClick={() => handleArrowClick("right")}>
        <i ref={rightArrow}><FaAngleRight /></i>
      </div>
    </div>
  )
}

export default Slider