import { FC } from "react";
import Modal from "./Modal";
import AppInput from "./Input";
import useLoginForm from "@/hooks/forms/useLogin.hook";
import AppButton from "./Button";

interface AdditionFormProps {
  id: string;
}

const AdditionForm: FC<AdditionFormProps> = ({ id }) => {
  const { formData, formErrors, onInputDataChange, onFormSubmit } =
    useLoginForm({
      email: "",
      password: "",
    });
  return (
    <Modal id={id}>
      <div className=" dark:border-strokedark  ">
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <AppInput
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={onInputDataChange}
            />
            {formErrors.email && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.email}
              </p>
            )}
          </div>
          <div className="mb-6">
            <AppInput
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={onInputDataChange}
            />
            {formErrors.password && (
              <p className="erreur ml-1.5 text-[14px] font-medium text-red">
                {formErrors.password}
              </p>
            )}
          </div>
          <div className="mb-5">
            <AppButton name="Connexion" onClick={() => {}} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AdditionForm;
