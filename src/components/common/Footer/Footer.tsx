import styles from "./styles.module.css";

const { footerContainer, footerContent, socialIcons } = styles;

const Footer = () => {
  return (
    <footer className={footerContainer}>
      <div className={footerContent}>
        <span>© 2025 ShopifyX. All rights reserved.</span>
        <div className={socialIcons}>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/src/assets/svg/like-fill.svg" alt="Instagram" />
          </a>
          <a href="/wishlist" aria-label="Wishlist">
            <img src="/src/assets/svg/wishlist.svg" alt="Wishlist" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
