import styles from "./styles.module.css";
type TProductInfoProps = {
  title: string;
  img: string;
  price: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
  quantity?: number;
};

const ProductInfo = ({
  title,
  img,
  price,
  direction = "row",
  style,
  quantity,
  children,
}: TProductInfoProps) => {
  return (
    <div className={styles[`product-${direction}`]} style={style}>
      <div className={styles[`productImg-${direction}`]}>
        <img src={img} alt={title} />
      </div>
      <div className={styles[`productInfo-${direction}`]}>
        <h2>{title}</h2>
        <h3>{Number(price).toFixed(2)} EGP</h3>
        {quantity && <h3>total qunatity: {quantity}</h3>}
        {quantity && <h3>total price: {(quantity * price).toFixed(2)}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
