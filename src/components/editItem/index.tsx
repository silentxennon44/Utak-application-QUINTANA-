/* eslint-disable @next/next/no-img-element */
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./editItem.module.scss";
import classNames from "classnames";
import { useAppSelector } from "@/store/hooks/hooks";
import {
  getStorage,
  ref as storageRef,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytes,
  deleteObject
} from "firebase/storage";
import {FoodItem} from "@/store/reducers/foods"
import { ref as dbRef, update } from "firebase/database";
import { database, storage } from "@/utils/firebase";

type props = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  item?: FoodItem
  height: number;
};

function EditItems({ setIsModalOpen, item, height }: props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { category: currentCategory } = useAppSelector(
    (state) => state.Category
  );
  const { Foods: menuData } = useAppSelector((state) => state.Foods);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item ? item?.name : "");
  const [amountInStock, setAmountInStock] = useState(
    item ? item?.amountInStock : ""
  );
  const [cost, setCost] = useState(item ? item?.cost : "");
  const [image, setImage] = useState(item ? item?.image : "");
  const [imagePath, setImagePath] = useState(item ? item?.fileName : "");
  const [options, setOptions] = useState(item ? item.options || [] : []);
  const [price, setPrice] = useState(item ? item?.price : "");
  const [ingredients, setIngredients] = useState(
    item ? item?.ingredients || [] : []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const imgStorage = [] as String[]

  useEffect(() => {
    setIsLoaded((_) => true);
    const listRef = storageRef(storage, "");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          
          getDownloadURL(itemRef).then((url) => {
            if (item && itemRef.fullPath === item.fileName) {
              setImage((_) => url);
              setImagePath((_) => item.image);
            }
            // imgStorage.push(url);
            // console.log(url)
          });
          getMetadata(itemRef).then((url) => {
            imgStorage.push(url.name);
          });

              // console.log(itemRef)
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  const handleDelete = () => {

  };

  const handleSave = () => {
    // console.log(amountInStock)
    // console.log(image)
    // console.log(cost)
    // console.log(ingredients)
    // console.log(name)
    // console.log(options)
    // console.log(price)
    // console.log(imagePath)

    // update(dbRef(firebaseConfig(), `Foods/${currentCategory}/${menuData[currentCategory].indexOf(item!)}`), {
    //   amountInStock: amountInStock,
    //   cost: cost,
    //   ingredients: ingredients,
    //   // fileName: fileName,
    //   // image: imagePath??image
    //   name: name,
    //   options: options,
    //   price: price,
    // }).then(()=>{
    //   console.log("Success")
    // }).catch((error)=>{
    //   console.log(error)
    // })
  };

  const handleAdd = () => {
    // console.log(amountInStock)
    // console.log(image)
    // console.log(cost)
    // console.log(ingredients)
    // console.log(name)
    // console.log(options)
    // console.log(price)
    // console.log(imagePath)

    console.log(imgStorage, image)

    if (imgStorage.includes(imagePath)) {
      deleteObject(storageRef(storage, imagePath)).then((res)=>{
        console.log("Success", res)
      }).catch((error)=>{
        console.log(error)
      })
    }
  }

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(_=>imageUrl);
      setImagePath(_=>file.name);
    } else {
      alert('Please select an image file');
    }
  };

  return (
    <div
      className={classNames(styles.editModalContainer, {
        [styles.isLoaded]: isLoaded,
      })}
    >
      <span
        className={styles.close}
        onClick={() => {
          setIsLoaded((_) => false);
          setTimeout(() => {
            setIsModalOpen((_) => false);
          }, 250);
        }}
      />
      <div className={styles.content}>
        <div className={styles.name}>
          {item?.name && !isEditing ? item.name : "Food Name: "}{" "}
          {(!item || isEditing) && (
            <input
              type="text"
              placeholder="Food Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>

        <div className={styles.mainDetails} style={{ height: height / 1.5 }}>
          <span className={styles.thumbnail}>
            Image:
            {!image ? (
              "No image available"
            ) : (
              <img className={styles.img} src={image} loading="eager" alt={item?.name} />
            )}
            {(isEditing || !item) && (
              <>
                <button onClick={() => fileInputRef.current?.click()}>{!item ? "Upload" : "Update"}</button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </>
            )}
          </span>
          <span className={styles.itemOptions}>
            Options:{" "}
            <textarea
              onChange={(e) => setOptions((_) => e.target.value.split(", "))}
              value={
                options.length > 0
                  ? options.join(", ")
                  : !!item && !isEditing
                  ? "No Options"
                  : ""
              }
              placeholder="Options"
              readOnly={!!item && !isEditing}
            />
          </span>
          <span className={styles.ingredients}>
            Ingredients:{" "}
            <textarea
              onChange={(e) =>
                setIngredients((_) => e.target.value.split(", "))
              }
              value={
                ingredients.length > 0
                  ? ingredients.join(", ")
                  : !!item && !isEditing
                  ? "No ingredients"
                  : ""
              }
              placeholder="Options"
              readOnly={!!item && !isEditing}
            />
          </span>
          <span className={styles.price}>
            Price: ${" "}
            {isEditing || !item ? (
              <input
                placeholder="Price"
                value={price}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  const limitedValue = Math.min(Number(numericValue), 10000);
                  setPrice(limitedValue.toString());
                }}
              />
            ) : (
              price
            )}
          </span>
          <span className={styles.cost}>
            Cost: ${" "}
            {isEditing || !item ? (
              <input
                placeholder="Cost"
                value={cost}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, '');
                  const limitedValue = Math.min(Number(numericValue), 10000);
                  setCost(limitedValue.toString());
                }}
              />
            ) : (
              cost
            )}
          </span>
          <span className={styles.stock}>
            Stock:{" "}
            {isEditing || !item ? (
              <input
                placeholder="Amount in Stocks"
                value={amountInStock}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only numbers and up to two decimal places
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (regex.test(value)) {
                    let numericValue = parseFloat(value);

                    // Handle cases where the value is not a number
                    if (isNaN(numericValue)) {
                      setAmountInStock('');
                    } else {
                      // Limit the value to 10000
                      numericValue = Math.min(numericValue, 10000);

                      // Set the value in state
                      setAmountInStock(value);
                    }
                  }
                }}
              />
            ) : (
              amountInStock
            )}
          </span>
        </div>

        <div className={styles.options}>
          {isEditing && <button className={styles.delete} onClick={handleDelete}>Delete</button>}
          {!isEditing && item && (
            <button
              className={styles.edit}
              onClick={() => setIsEditing((_) => !isEditing)}
            >
              Edit
            </button>
          )}
          {isEditing && <button className={styles.save} onClick={handleSave}>Save</button>}
          {(isEditing || !item) && (
            <button
              className={styles.cancel}
              onClick={() => setIsEditing((_) => false)}
            >
              Cancel
            </button>
          )}
          {!item && <button className={styles.add} onClick={handleAdd}>Add</button>}
        </div>
      </div>
    </div>
  );
}

export default EditItems;
