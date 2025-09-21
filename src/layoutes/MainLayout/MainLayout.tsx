import styles from "./styles.module.css";
import { Header, Footer } from "@components/common";
import { Outlet } from "react-router-dom";
const { container, hero, content, wrapper } = styles;

const MainLayout = () => {
  return (
    <div className={container}>
      <Header />
      <section className={hero}>
        <div className={styles.heroText}>
          <h1>Discover Unique Products</h1>
          <p>
            Shop the latest trends and exclusive deals in our creative
            marketplace.
          </p>
        </div>
        <div className={styles.heroImage}>
          {/* Add a creative SVG or Lottie animation here */}
          <img src="/src/assets/svg/cart.svg" alt="Shop Now" />
        </div>
      </section>
      <div className={content}>
        <div className={wrapper}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
