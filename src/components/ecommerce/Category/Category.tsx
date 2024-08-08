import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { ICategory } from "@customTypes/category";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ title, prefix, img }: ICategory) => {
  return (
    <div className={category}>
      <Link to={`/categories/products/${prefix}`}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>Title</h4>
      </Link>
    </div>
  );
};

export default Category;
