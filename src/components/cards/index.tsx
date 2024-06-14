/* eslint-disable @next/next/no-img-element */
import styles from "./card.module.scss"
import EditItems from "../editItem"
import { useState } from "react";
import { createPortal } from 'react-dom';
import { Image } from 'antd';

type props = {
  params: {
    amountInStock: number;
    cost: number;
    image: string;
    name: string;
    options?: string[];
    price: number;
    ingredients: string[];
  }
  height: number;
}

function Card({ params, height } : props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = (item : typeof params) => {
    setIsModalOpen(_=>true)
  }

  return (<>
      <div className={styles.cards}>
        {/* <Image
          alt={params.name}
          src={params.image}
          className={styles.image}
        /> */}
        <div className={styles.imgContainer}><img src={params.image} alt={params.name} className={styles.image} /></div>
        <span className={styles.name}>{params.name}</span>
        <div className={styles.info}>
          <span className={styles.price}>Price: $ {params.price}</span>
          <span className={styles.cost}>Cost: $ {params.cost}</span>
          <span className={styles.stock}>Stock: {params.amountInStock}</span>
          {
            params.options && <span className={styles.options} title={params.options.join(", ")}>Options: {params.options.length}</span>
          }
        </div>
        <div className={styles.edit}><button onClick={()=>handleClick(params)}>View</button></div>
      </div>

      {isModalOpen && createPortal(<EditItems setIsModalOpen={setIsModalOpen} item={params} height={height}/>, document.body)}
    </>
  )
}

export default Card