import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ProductsContext } from "../context/ProductsContext";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { products } = useContext(ProductsContext) || {};
  const { cartItems, setCartItems } = useContext(CartContext) || {};
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [windowWidth] = useState<number>(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || !products) return;

    const newCartProducts = products.filter((product: any) =>
      cartItems.includes(product.customId)
    );

    setCartProducts(newCartProducts);
  }, [products, cartItems]);

  const calculateTotal = () => {
    return cartProducts.reduce(
      (total: any, product: any) =>
        total +
        Math.trunc((product.price / 100) * 70) * (product.quantity || 1),
      0
    );
  };

  const increaseQuantity = (customId: number) => {
    const updatedCartProducts = cartProducts.map((product: any) => {
      if (product.customId === customId) {
        return { ...product, quantity: (product.quantity || 1) + 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
  };

  const decreaseQuantity = (customId: number) => {
    const updatedCartProducts = cartProducts.map((product: any) => {
      if (
        product.customId === customId &&
        product.quantity &&
        product.quantity > 1
      ) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
  };

  const removeItem = (customId: number) => {
    const updatedCartProducts = cartProducts.filter(
      (product: any) => product.customId !== customId
    );
    setCartProducts(updatedCartProducts);

    if (setCartItems) {
      setCartItems(updatedCartProducts.map((product) => product.customId));
    }
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/details/${productId}`);
  };

  return (
    <div className="p-4 md:px-16 md:py-8 min-h-[calc(100vh-152px)] ">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartProducts.length === 0 ? (
        <p className="text-deepWhite">Your cart is empty.</p>
      ) : (
        <>
          <ul className="flex flex-col bg-[#202020] bg-primary p-4 md:p-8 rounded gap-2 border-gray6 border">
            {cartProducts.map((product: any, index: number) => (
              <React.Fragment key={product.customId}>
                <li className="flex items-center justify-between gap-6 sm:gap-0 flex-col sm:flex-row py-2">
                  <div className="flex items-start flex-row sm:space-x-4 w-full gap-4 sm:gap-0">
                    <div
                      onClick={() => handleProductClick(product.id)}
                      className="h-[120px] w-[120px] sm:h-[180px] sm:w-[180px] flex items-center justify-center border-[1px] border-gray6 bg-gray9 rounded-[5px] p-2 cursor-pointer"
                    >
                      <img
                        className="w-fit max-h-[140px] aspect-squar rounded-[5px]"
                        src={product.thumbnail}
                        alt={product.title}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-lg sm:text-2xl text-primary ${
                          windowWidth < 600 ? "max-w-[300px]" : "max-w-[300px]"
                        }`}
                      >
                        {product.title.length > (windowWidth < 600 ? 30 : 60)
                          ? product.title.substring(
                              0,
                              windowWidth < 600 ? 30 : 60
                            ) + "..."
                          : product.title}
                      </p>
                      <p className="text-md text-primary">
                        ${Math.trunc((product.price / 100) * 70)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-fit">
                    <div className="flex flex-row gap-4 w-full sm:w-full sm:flex-col ">
                      <div className="flex items-center justify-center space-x-4 sm:space-x-4 bg-gray9 border-gray6 text-white border-[1px] px-4 py-2 rounded text-[10px] sm:text-small md:text-medium w-1/2 sm:w-full">
                        <button
                          className="text-gray5"
                          onClick={() => decreaseQuantity(product.customId)}
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="text-lg text-center w-[15px]">
                          {product.quantity || 1}
                        </span>
                        <button
                          className="text-gray5"
                          onClick={() => increaseQuantity(product.customId)}
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.customId)}
                        className="bg-gray9 border-gray6 hover:bg-gray8 hover:border-gray5 text-white border-[1px] px-4 py-2 rounded text-md w-1/2 sm:w-full"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
                {index < cartProducts.length - 1 && (
                  <div className="w-full h-px bg-gray6 my-2" />
                )}
              </React.Fragment>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-xl font-semibold">
              Subtotal: ${Math.trunc(calculateTotal())}
            </p>
            <button className="bg-gray9 border-gray5 hover:bg-gray8 hover:border-gray5 text-white border-[1px] text-primary px-4 py-2 rounded mt-4">
              <a href="https://www.fhoas.dev/">Proceed to Checkout</a>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
