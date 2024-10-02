import HeaderCounter from "../HeaderCounter/HeaderCounter";
import Logo from "@assets/svg/cart.svg?react";
import Whishlist from "@assets/svg/wishlist.svg?react";
import { useAppSelector } from "@store/hooks";
import styles from "./styles.module.css";
import { totalQuantitySelector } from "@store/cart/selectors";

const HeaderLeftBar = () => {
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const cartTotalQuantity = useAppSelector(totalQuantitySelector);
  const { headerLeftBar } = styles;

  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        title="Wishlist"
        totalQuantity={wishlistTotalQuantity}
        svgIcon={<Whishlist title="wishlist" />}
        to="/wishlist"
      />
      <HeaderCounter
        title="Cart"
        totalQuantity={cartTotalQuantity}
        svgIcon={<Logo title="cart" />}
        to="/cart"
      />
    </div>
  );
};

export default HeaderLeftBar;
