import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import useCheckEmailAvelability from "./useCheckEmailAvelability";
import { SubmitHandler, useForm } from "react-hook-form";
import { actAuthRegister, resetErrorHnadler } from "@store/auth/authSlice";
import { signUpSchema, signUpType } from "../validations/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    resetCheckEmailAvailability,
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
  } = useCheckEmailAvelability();
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpType>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });
  const submitForm: SubmitHandler<signUpType> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== value) {
      console.log(value);
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && enteredEmail) {
      resetCheckEmailAvailability();
    }
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
    emailOnBlurHandler,
    register,
    handleSubmit,
    errors,
    emailAvailabilityStatus,
    loading,
    error,
  };
};

export default useRegister;
