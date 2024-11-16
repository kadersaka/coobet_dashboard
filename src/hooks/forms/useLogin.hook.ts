import AuthAPI from "@/api/auth.api";
import User from "@/models/user.model";
import useInterfaceStore from "@/store/useInterfaceStore.store";
import useAuthenticatedUserStore from "@/store/useUserStore.store";
import { toggleModal } from "@/utils/functions.util";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string | null;
  password: string | null;
}

const useLoginForm = ({ email, password }: FormData) => {
  const [formData, setFormData] = useState<FormData>({
    email: email,
    password: password,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });

  // const router = useRouter();

  const setAuthenticatedUser = useAuthenticatedUserStore(
    (state) => state.setAuthenticatedUser,
  );

  const setActionResultMessage = useInterfaceStore(
    (state) => state.setActionResultMessage,
  );

  const onInputDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors: FormErrors = {
      email: null,
      password: null,
    };

    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "L'email n'est pas valide";
    }

    if (!formData.password.trim()) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.trim().length < 6) {
      errors.password = "Le mot de passe doit comporter au moins 6 caractères.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password =
        "Le mot de passe doit comporter au moins une lettre majuscule.";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password =
        "Le mot de passe doit comporter au moins une lettre minuscule.";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Le mot de passe doit comporter au moins un chiffre.";
    }

    setFormErrors(errors);

    return !errors.email && !errors.password;
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: FormErrors = {
      email: null,
      password: null,
    };

    //  const response =  AuthAPI.verifyAuthentication(authenticatedEmploye);

    if (validateForm()) {
      console.log("Form validated");

      const response = await AuthAPI.login({
        email: formData.email,
        password: formData.password,
      });

      //  console.log("response", response);

      if (response?.message) {
        errors.email = response?.message;
        errors.password = response?.message;
        setFormErrors(errors);
      } else if (response?.data) {
        setActionResultMessage(
          `Bienvenue M. | Mme ${response.data.firstname} ${response.data.lastname}`,
        );
        toggleModal("action-result-message");

        setAuthenticatedUser(User.fromJson(response.data));

        setTimeout(() => {
          //  router.push("/");
          window.location.href = "/";
        }, 1500);
      } else {
        setActionResultMessage("Erreur lors de l'authentification");
        toggleModal("action-result-message");
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  return {
    formData,
    formErrors,
    onInputDataChange,
    onFormSubmit,
  };
};

export default useLoginForm;
