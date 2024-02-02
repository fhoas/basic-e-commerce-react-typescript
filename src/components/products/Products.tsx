// Products.tsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import { CartContext } from "../../context/CartContext";

interface ProductsProps {
  product: any;
  id: number;
}

const Products: React.FC<ProductsProps> = ({ product, id }) => {
  const { index, setIndex } = useContext(ProductsContext) || {};
  const { cartItems, setCartItems } = useContext(CartContext) || {};
  const navigate = useNavigate();

  const handleClick = () => {
    if (setIndex) {
      setIndex(product.id - 1);
      navigate(`details/${index}`);
    }
  };

  const addCart = () => {
    if (setCartItems) {
      const newCartItems = cartItems ? [...cartItems] : [];

      const numericId = Number(id);

      if (!isNaN(numericId) && !newCartItems.includes(numericId)) {
        newCartItems.push(numericId);
        setCartItems(newCartItems);
      }
    }
  };

  const discountCost = Math.trunc((product.price / 100) * 70);

  const truncatedTitle =
    product.title.length > 50
      ? product.title.substring(0, 50) + "..."
      : product.title;

  return (
    <div className="flex justify-between items-center relative flex-col bg-[#FFFFFF] text-primary h-fit min-h-[350px] p-4 rounded cursor-pointer duration-500  hover:scale-105">
      <span className="absolute left-0 top-0">
        <img
          className=" h-[75px] w-[75px]"
          src="./assets/discount.png"
          alt=""
        />
      </span>
      <div
        onClick={handleClick}
        className="flex justify-center items-center flex-col gap-2 p-4"
      >
        <div>
          <img
            className="w-[200px] aspect-square"
            src={product.image}
            alt="#"
          />
        </div>
        <div className="flex items-center justify-center text-center h-[50px] leading-4 text-deepPurple3">
          {truncatedTitle}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center gap-2 font-bold ">
          <span className="line-through text-deepPurple3">
            {product.price}$
          </span>
          <span className="text-deepPurple2 text-xl">{discountCost}$</span>
        </div>

        <button
          onClick={addCart}
          className="bg-deepPurple1 hover:bg-deepPurple2 py-2 px-8 rounded text-primary bg-primary mt-4 w-full"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Products;
