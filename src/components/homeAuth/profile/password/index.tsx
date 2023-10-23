"use client";
import ToastComponent from "@/components/common/toast";
import profileService from "@/services/profileService";
import { FormEvent, useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";

const PasswordForm = function () {
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsopen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      setCurrentPassword(password.password);
      setNewPassword(password.newPassword);
    });
  }, []);

  const handlePasswordUpdate = async function (
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setToastIsopen(true);
      setErrorMessage("Senha e confirmação de senha não coincidem");
      setColor("bg-danger");
      setTimeout(() => setToastIsopen(false), 3000);
      return;
    }

    if (password === newPassword) {
      setToastIsopen(true);
      setErrorMessage("Nova senha deve ser diferente da atual");
      setColor("bg-danger");
      setTimeout(() => setToastIsopen(false), 3000);
      return;
    }

    const res = await profileService.passwordUpdate({
      password,
      newPassword,
    });

    if (res === 204) {
      setToastIsopen(true);
      setErrorMessage("Senha atualizada com sucesso");
      setColor("bg-success");
      setTimeout(() => setToastIsopen(false), 3000);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if (res === 400) {
      setToastIsopen(true);
      setErrorMessage("Senha atual incorreta");
      setColor("bg-danger");
      setTimeout(() => setToastIsopen(false), 3000);
    }
  };

  return (
    <>
      <Form
        onSubmit={handlePasswordUpdate}
        className="border-solid border-1 max-w-full border-azulClaro p-5 pt-0 dark:text-white"
      >
        <div className="flex flex-col items-center ">
          <FormGroup>
            <Label for="currentPassword" className="text-sm font-bold pt-4">
              Senha Atual
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
              name="currentPassword"
              id="currentPassword"
              type="password"
              placeholder="***********"
              required
              value={password}
              onChange={(e) => {
                setCurrentPassword(e.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <div className="flex flex-col items-center ">
          <FormGroup>
            <Label for="newPassword" className="text-sm font-bold ">
              Nova Senha
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
              name="newPassword"
              id="newPassword"
              type="password"
              placeholder="***********"
              required
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.currentTarget.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword" className="text-sm font-bold">
              Confirme a Nova Senha
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="***********"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
              }}
            />
          </FormGroup>
          <button
            type="submit"
            className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
          >
            Salvar Alterações
          </button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default PasswordForm;
