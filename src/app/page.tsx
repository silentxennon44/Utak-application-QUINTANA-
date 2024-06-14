"use client";

import styles from "./page.module.scss";
import Navbar from '../components/navbar/index';

import 'react-alice-carousel/lib/alice-carousel.css';
import Slider from "@/components/slider";
import { menusCategories } from "@/staticData";
import { database} from "@/utils/firebase";
import { useEffect, useRef, useState } from "react";
import { child, get, ref } from "firebase/database";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import Card from "@/components/cards";
import Loading from "./loading";
import * as FoodsActions from "@/store/actions/foods";
import { createPortal } from "react-dom";
import EditItems from "@/components/editItem";

export default function Home() {
  const { category: currentCategory, } = useAppSelector((state) =>state.Category) 
  const { Foods: menuData, } = useAppSelector((state) =>state.Foods) 
  const dispatch = useAppDispatch();
  const [height, setHeight] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(()=>{
    get(child(ref(database), "Foods/")).then(snapshot => {
      if(snapshot.exists()) {
        dispatch({
          type: FoodsActions.SET_FOOD,
          payload: {
            Foods: snapshot.val(),
          },
        });
      }
    })

    setHeight((prev: number) => {
      return window.innerHeight - sliderRef.current!.clientHeight - 100
    })

    setIsLoading(()=>false)

    window.addEventListener('resize', ()=>{
      setHeight((prev: number) => {
        return window.innerHeight - sliderRef.current!.clientHeight - 100
      })
    });
  }, []);

  return (<>
    {isLoading && <div className={styles.loader}><Loading/></div>}
    <main className={styles.main}>
      <Navbar />
      <section className={styles.mainWindow}>

        <div ref={sliderRef}><Slider tabs={menusCategories}/></div>

        <div className={styles.content} style={{height: height}}>
          {
            menuData[currentCategory] && menuData[currentCategory].map((item, index) => <Card key={index} params={item} height={height}/>)
          }
          {
            menuData[currentCategory] && menuData[currentCategory].length < 10 &&<div className={styles.add} onClick={() => setIsModalOpen(_=>true)}>+</div>
          }
        </div>

      </section>
      {isModalOpen && createPortal(<EditItems setIsModalOpen={setIsModalOpen} height={height}/>, document.body)}
    </main>
  </>
  );
}
