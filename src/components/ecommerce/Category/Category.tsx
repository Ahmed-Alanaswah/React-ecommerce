import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { ICategory } from "@types";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, prefix, img }: ICategory) => {
  return (
    <div className={category}>
      <Link to={`/category/products/${prefix}`}>
        <div className={categoryImg}>
          {img ? (
            <img
              src={img}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#e0e7ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                color: "#6366f1",
                fontWeight: 700,
              }}
            >
              No Image
            </div>
          )}
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;
