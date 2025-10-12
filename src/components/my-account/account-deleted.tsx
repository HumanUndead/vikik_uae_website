import { useForm, Controller } from "react-hook-form";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import PhoneInput from "react-phone-input-2";
// import { ThreeDot } from "@components/icons/three-dot";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";

interface DeleteAccountData {
  phone: string;
  email: string;
}

const DeletedAccount: React.FC = () => {
  const { t } = useTranslation();
  const [load, setLoad] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<DeleteAccountData>();

  async function onSubmit({ phone, email }: DeleteAccountData) {
    const fullPhoneNumber = `00${phone}`;
    setLoad(true);
    try {
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="container m-auto max-w-lg px-4 lg:px-0 h-96 flex flex-col justify-center">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("common:text-deleted")}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        noValidate
      >
        <div className="flex flex-col space-y-3.5">
          {/* Phone Input */}
          <p>{t("forms:label-phone")}</p>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: `${t("forms:phone-required")}`,
              pattern: {
                value: /^\+?[1-9]\d{7,14}$/,
                message: t("forms:phone-error"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country={"jo"}
                value={value}
                onChange={onChange}
                inputProps={{
                  required: true,
                  autoFocus: true,
                }}
                inputStyle={{ width: "100%", height: "40px" }}
                placeholder={t("forms:label-phone")}
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <p>{t("forms:label-email")}</p>
          <input
            type="email"
            {...register("email", {
              required: t("forms:email-required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("forms:email-error"),
              },
            })}
            className="py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12 rounded-md"
            placeholder={t("forms:label-email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Submit Button */}
          <div className="relative">
            <Button
              type="submit"
              className="h-11 md:h-12 w-full mt-1.5"
              disabled={load}
            >
              {load ? "" : t("common:text-deleted")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeletedAccount;
