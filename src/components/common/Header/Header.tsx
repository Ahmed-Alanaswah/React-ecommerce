import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
const { headerContainer, headerLogo, navLinks, logoIcon, navRight } = styles;

const Header = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(actGetWishlist("productsIds"));
  }, [dispatch, accessToken]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header>
      <div className={headerContainer}>
        <div className={headerLogo}>
          <img src="/src/assets/svg/cart.svg" alt="Logo" className={logoIcon} />
          <span
            style={{
              fontWeight: 800,
              fontSize: "2.2rem",
              marginLeft: 8,
              color: "#6366f1",
            }}
          >
            ShopifyX
          </span>
        </div>
        <nav className={navLinks}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Categories</NavLink>
          <NavLink to="/about-us">About</NavLink>
        </nav>
        <div className={navRight}>
          <HeaderLeftBar />
          {!accessToken ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "#6366f1",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => setIsDropdownOpen((open) => !open)}
              >
                {user ? `${user.firstName} ${user.lastName}` : "Account"}
              </button>
              {isDropdownOpen && (
                <div
                  className="dropdown-content"
                  style={{
                    position: "absolute",
                    background: "#fff",
                    color: "#6366f1",
                    boxShadow: "0 2px 8px #6366f122",
                    borderRadius: 16,
                    marginTop: 12,
                    minWidth: 160,
                    zIndex: 10,
                    padding: "16px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <NavLink
                    to="/profile"
                    style={{
                      padding: "8px 24px",
                      borderRadius: "8px",
                      fontWeight: 600,
                    }}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/profile/orders"
                    style={{
                      padding: "8px 24px",
                      borderRadius: "8px",
                      fontWeight: 600,
                    }}
                  >
                    Orders
                  </NavLink>
                  <hr style={{ margin: "8px 0" }} />
                  <button
                    style={{
                      background:
                        "linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 700,
                      cursor: "pointer",
                      padding: "8px 24px",
                    }}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      dispatch(authLogout());
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
