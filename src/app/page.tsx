"use client";

import styles from "./page.module.scss";
import Navbar from '../components/navbar/index';

import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "@/components/slider";
import { menusCategories } from "@/staticData";
import firebaseConfig from "@/utils/firebase";
import { useEffect, useRef, useState } from "react";
import { child, DataSnapshot, get, ref } from "firebase/database";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import Card from "@/components/cards";
import Loading from "./loading";
import * as FoodsActions from "@/store/actions/foods";

export default function Home() {
  const { category: currentCategory, } = useAppSelector((state) =>state.Category) 
  const { Foods: menuData, } = useAppSelector((state) =>state.Foods) 
  // const [menuData, setMenuData] = useState<{ [key: string]: Array<{ [key: string]: any}> }>({});
  const dispatch = useAppDispatch();
  const [height, setHeight] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    get(child(ref(firebaseConfig()), "Foods/")).then(snapshot => {
      if(snapshot.exists()) {
        // setMenuData(snapshot.val());
        dispatch({
          type: FoodsActions.SET_FOOD,
          payload: {
            Foods: snapshot.val(),
          },
        });
      }
    })

    setHeight((prev: number) => {
      return window.innerHeight - sliderRef.current!.clientHeight - optionsRef.current!.clientHeight - 100
    })

    setIsLoading(()=>false)
  }, []);

  // useEffect(()=>{
  //   console.log(menuData[currentCategory])
  // }, [currentCategory]);

  return (<>
  {/* // isLoading?  : */}
    {isLoading && <div className={styles.loader}><Loading/></div>}
    <main className={styles.main}>
      <Navbar />
      <section className={styles.mainWindow}>

        <div ref={sliderRef}><Slider tabs={menusCategories}/></div>

        <div className={styles.content} style={{height: height}}>
          {
            menuData[currentCategory] && menuData[currentCategory].map((item, index) => <Card key={index} params={item}/>)
          }
        </div>

        <div className={styles.options} ref={optionsRef}>
          <h1>footer</h1>
        </div>

      </section>
    </main>
  </>
  );
}
