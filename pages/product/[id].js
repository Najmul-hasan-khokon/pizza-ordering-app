import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  //  extras er vitore updated extra option thakbe.
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // const pizza = {
  //   id: 1,
  //   img: "/images/pizza.png",
  //   name: "CAMPAGNOLA",
  //   price: [19.9, 35, 55, 4, 22],
  //   desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, impedit!",
  // };

  // price handler
  function changePrice(number) {
    // pizza er size change ba check korle price change hobe
    setPrice(price + number);
  }

  // pizza size handler
  function handleSize(sizeIndex) {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  }

  // pizza extra option checked handler
  function handleChange(e, option) {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price); // checked false hole price reset hobe
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  }

  // add to cart product handler
  function handleAddToCart() {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} layout="fill" objectFit="contain" alt="" />
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>

        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>

        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button onClick={handleAddToCart} className={styles.button}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  // console.log(params.id);
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  // console.log(res.data);

  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;

// <div className={styles.option}>
//             <input
//               className={styles.checkbox}
//               type="checkbox"
//               id="cheese"
//               name="cheese"
//             />
//             <label htmlFor="cheese">Extra Cheese</label>
//           </div>
//           <div className={styles.option}>
//             <input
//               className={styles.checkbox}
//               type="checkbox"
//               id="spicy"
//               name="spicy"
//             />
//             <label htmlFor="spicy">Spicy Sauce</label>
//           </div>
//           <div className={styles.option}>
//             <input
//               className={styles.checkbox}
//               type="checkbox"
//               id="garlic"
//               name="garlic"
//             />
//             <label htmlFor="garlic">Garlic Sauce</label>
//           </div>
