/* eslint-disable @next/next/no-img-element */
import styles from "./card.module.scss"

type params = {
  image: string;
  name: string;
  price: number;
  cost: number;
  amountInStock: number;
  options?: string[];
}

function Card({ params } : {params: params}) {

  const handleClick = (item : params) => {
    console.log(item)
  }

  return (
    <div className={styles.cards}>
      <img src={params.image} alt={params.name} className={styles.image} />
      <span className={styles.name}>{params.name}</span>
      <div className={styles.info}>
        <span className={styles.price}>Price: {params.price}</span>
        <span className={styles.cost}>Cost: {params.cost}</span>
        <span className={styles.stock}>Stock: {params.amountInStock}</span>
        {
          params.options && <span className={styles.options} title={params.options.join(", ")}>Options: {params.options.length}</span>
        }
      </div>
      <div className={styles.edit}><button onClick={()=>handleClick(params)}>Edit</button></div>
    </div>
  )
}

export default Card