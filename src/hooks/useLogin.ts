import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signInSchema, signInType } from "../validations/signInSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { resetErrorHnadler } from "@store/auth/authSlice";
import { useEffect } from "react";

const useLogin = () => {
  const [searchParames, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });
  const submitForm: SubmitHandler<signInType> = async (data) => {
    if (searchParames.get("message")) {
      setSearchParams("");
    }
    const { email, password } = data;
    await dispatch(actAuthLogin({ email, password }))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    return () => {
      dispatch(resetErrorHnadler());
    };
  }, [dispatch]);
  if (accessToken) {
    Navigate({ to: "/", replace: true });
  }
  return {
    submitForm,
    handleSubmit,
    register,
    errors,
    loading,
    error,
    searchParames,
    setSearchParams,
  };
};

export default useLogin;
