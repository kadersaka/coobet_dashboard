"use client";

import React from "react";
import AppInput from "@/components/widget/Form/Input";
import AppButton from "@/components/widget/Form/Button";
import useLoginForm from "@/hooks/forms/useLogin.hook";

const SignIn: React.FC = () => {
  const { formData, formErrors, onInputDataChange, onFormSubmit } =
    useLoginForm({
      email: "",
      password: "",
    });

  return (
    <div className=" flex h-screen w-screen items-center justify-center rounded-sm shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="rounded-md' w-full bg-white shadow-lg dark:border-strokedark xl:w-1/3 ">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
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
      </div>
    </div>
  );
};

export default SignIn;
