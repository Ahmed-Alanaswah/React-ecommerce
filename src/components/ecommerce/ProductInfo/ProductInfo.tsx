import styles from "./styles.module.css";
type TProductInfoProps = {
  title: string;
  img: string;
  price: string;
  direction?: "row" | "column";
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

const ProductInfo = ({
  title,
  img,
  price,
  direction = "row",
  style,
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
        {children}
      </div>
    </div>
  );
};

export default ProductInfo;
