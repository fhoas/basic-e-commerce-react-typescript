import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import { CartContext } from "../../context/CartContext";
import { FaCartShopping } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ProductsProps {
  product: any;
  id: number;
}

const Products: React.FC<ProductsProps> = ({ product, id }) => {
  const { setIndex, loading } = useContext(ProductsContext) || {};
  const { cartItems, setCartItems } = useContext(CartContext) || {};
  const navigate = useNavigate();
  const cartItemIds = cartItems || [];
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (loading === false) {
      setTimeout(() => {
        setWaiting(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setWaiting(false);
      }, 5000);
    }
  }, []);

  const [addedToCart, setAddedToCart] = useState<boolean>(
    cartItemIds.includes(id)
  );

  const handleClick = () => {
    if (setIndex) {
      setIndex(id - 1);
      navigate(`details/${id}`);
    }
  };

  const addCart = () => {
    if (setCartItems) {
      const newCartItems = cartItemIds ? [...cartItemIds] : [];

      const numericId = Number(id);

      if (!isNaN(numericId)) {
        if (addedToCart) {
          const updatedCartItems = newCartItems.filter(
            (itemId) => itemId !== numericId
          );
          setCartItems(updatedCartItems);
        } else {
          newCartItems.push(numericId);
          setCartItems(newCartItems);
        }
        setAddedToCart(!addedToCart);
      }
    }
  };

  const discountCost = Math.trunc((product.price / 100) * 70);

  const truncatedTitle =
    product.title.length > 50
      ? product.title.substring(0, 50) + "..."
      : product.title;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSkeletonWidth1 = () => {
    if (screenWidth >= 1224) {
      return "250px";
    } else if (screenWidth >= 768) {
      return "170px";
    } else {
      return "180px";
    }
  };

  const handleSkeletonWidth2 = () => {
    if (screenWidth >= 1224) {
      return "200px";
    } else if (screenWidth >= 768) {
      return "150px";
    } else {
      return "150px";
    }
  };

  return (
    <div className="flex justify-between items-center relative flex-col text-primary h-fit min-h-[350px] p-4 rounded cursor-pointer duration-500 border bg-gray9 border-gray6">
      {waiting === true ? (
        ""
      ) : (
        <span className="absolute right-[10px] top-[10px] z-10">
          <img
            className="h-[40px] w-[40px]"
            src="https://cdn-icons-png.freepik.com/512/8754/8754132.png"
            alt=""
          />
        </span>
      )}

      <div
        onClick={handleClick}
        className="flex justify-center items-center flex-col w-full"
      >
        <div className="h-[170px] flex items-center justify-center">
          {waiting === true ? (
            <Skeleton width={handleSkeletonWidth1()} height={"170px"} />
          ) : (
            <img
              className="w-full max-h-[170px] aspect-squar rounded-[5px]"
              src={product.thumbnail}
              alt="#"
            />
          )}
        </div>
        <div className="flex items-center justify-center text-center h-[50px] leading-6 sm:my-2">
          {waiting === true ? (
            <Skeleton width={handleSkeletonWidth1()} height={"20px"} />
          ) : (
            <div> {truncatedTitle}</div>
          )}
        </div>
      </div>
      <div className="w-full flex items-center gap-2 flex-col">
        {waiting === true ? (
          <button className="bg-gray10 border-gray6 pb-[11px] pt-[5px] rounded border text-primary bg-primary w-full flex justify-center items-center gap-2">
            <Skeleton width={handleSkeletonWidth2()} height={"20px"} />
          </button>
        ) : (
          <button className="bg-gray10 border-gray6 p-2 rounded border text-primary bg-primary w-full flex justify-center items-center gap-2">
            <span className="line-through text-deepWhite">
              {product.price}$
            </span>
            <span className="text-white">{discountCost}$</span>
          </button>
        )}

        {waiting === true ? (
          <button
            onClick={addCart}
            className={`bg-gray10 border-gray6 py-2 rounded border text-primary bg-primary w-full flex justify-center items-center gap-2`}
          >
            <Skeleton
              width={handleSkeletonWidth2()}
              height={"20px"}
              className="pt-[3px]"
            />
          </button>
        ) : (
          <button
            onClick={addCart}
            className={`bg-gray10 border-gray6 hover:bg-gray8 hover:border-gray5 py-2 rounded border text-primary bg-primary w-full flex justify-center items-center gap-2 ${
              addedToCart
                ? "bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600"
                : ""
            }`}
          >
            <div className="flex justify-center items-center gap-2">
              <FaCartShopping />
              {addedToCart ? "Added to Cart" : "Add to Cart"}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
