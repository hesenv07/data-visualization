import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, FormInput, FileUpload } from "components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { imageValidator } from "utils";
import { setAlertData, openModal, setModalData } from "store";
import { t } from "i18next";
import { CropImageModal, FullScreenImage } from "common";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { firstName, lastName, address, maidenName, email, phone, image } =
    user || {};

  useEffect(() => {
    formik.setFieldValue("avatar", user.image ? user?.image : "");
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: firstName || "",
      surname: lastName || "",
      address: address?.address || "",
      maiden_name: maidenName || "",
      email: email || "",
      phone: phone || "",
      avatar: image || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(3, t("min_length_message", { name: t("firstname"), length: 3 }))
        .required(t("required_message", { name: t("firstname") })),
      surname: Yup.string()
        .trim()
        .min(3, t("min_length_message", { name: t("lastname"), length: 3 }))
        .required(t("required_message", { name: t("lastname") })),
      maiden_name: Yup.string()
        .trim()
        .min(3, t("min_length_message", { name: t("maiden_name"), length: 3 }))
        .required(t("required_message", { name: t("maiden_name") })),
      avatar: null,
    }),
    onSubmit: async (data) => {
      let formData = new FormData();

      let fileFields = ["avatar"];

      for (let [key, value] of Object.entries(data)) {
        if (data[`${key}_status`] !== "delete") {
          if (fileFields.includes(key)) {
            if (
              (data[key] && typeof data[key] !== "string") ||
              data[key] == null
            )
              formData.append(key, value);
          } else {
            formData.append(key, value);
          }
        }
      }
      //send put request here
      console.log("Update user");
      dispatch(
        setAlertData({
          message: t("user_change_success"),
          status: "success",
        })
      );
    },
  });

  const handleSelectFile = (e, maxSize = 3) => {
    const { files, name } = e.target;
    const file = files[0];

    const reader = new FileReader();

    if (file) {
      const result = imageValidator(file, maxSize);

      if (result.file) {
        reader.readAsDataURL(result.file);

        reader.addEventListener(
          "load",
          () => {
            dispatch(
              setModalData({
                key: "file",
                value: { src: URL.createObjectURL(result.file), name },
              })
            );
            dispatch(openModal("crop_image"));
          },
          false
        );
      }

      result.error && formik.setFieldError([name], result.error);
    }
  };

  const setFile = (name, file) => {
    formik.setFieldValue(name, file);
    formik.setFieldValue(`${name}_status`, "");
  };

  const deleteFile = (keyName, ref) => {
    keyName && formik.setFieldValue(keyName, null);
    keyName && formik.setFieldValue(`${keyName}_status`, "delete");
    ref.current.value = "";
  };

  return (
    <>
      <div className="mx-auto max-w-350 text-black dark:text-white">
        <Breadcrumb pageName={t("profile")} />

        <div className="grid grid-cols-5 gap-0 md:gap-5">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border-top-0 md:border-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {t("personal_information")}
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 min-[500px]:flex-row">
                    <div className="w-full min-[500px]:w-1/2">
                      <FormInput
                        {...{
                          title: t("firstname"),
                          name: "name",
                          id: "name",
                          iconName: "username",
                          placeholder: t("firstname"),
                          value: formik.values.name,
                          onChange: formik.handleChange,
                          onBlur: formik.handleBlur,
                          error: formik.errors.name,
                        }}
                      />
                    </div>

                    <div className="w-full min-[500px]:w-1/2">
                      <FormInput
                        {...{
                          title: t("lastname"),
                          name: "surname",
                          id: "surname",
                          iconName: "username",
                          placeholder: t("lastname"),
                          value: formik.values.surname,
                          onChange: formik.handleChange,
                          onBlur: formik.handleBlur,
                          error: formik.errors.surname,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 min-[500px]:flex-row">
                    <div className="w-full min-[500px]:w-1/2">
                      <FormInput
                        {...{
                          title: t("maiden_name"),
                          name: "maiden_name",
                          id: "maiden_name",
                          iconName: "username",
                          placeholder: t("maiden_name"),
                          value: formik.values.maiden_name,
                          onChange: formik.handleChange,
                          onBlur: formik.handleBlur,
                          error: formik.errors.maiden_name,
                        }}
                      />
                    </div>

                    <div className="w-full min-[500px]:w-1/2">
                      <FormInput
                        {...{
                          title: t("email"),
                          name: "email",
                          id: "email",
                          type: "email",
                          iconName: "email_address",
                          placeholder: t("email"),
                          value: formik.values.email,
                          disabled: true,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 min-[500px]:flex-row">
                    <div className="w-full min-[500px]:w-1/2">
                      <FormInput
                        {...{
                          title: t("phone"),
                          name: "phone",
                          id: "phone",
                          type: "tel",
                          iconName: "mobileIcon",
                          placeholder: t("phone"),
                          value: formik.values.phone,
                          onChange: formik.handleChange,
                          onBlur: formik.handleBlur,
                          error: formik.errors.father_name,
                        }}
                      />
                    </div>

                    <div className="w-full min-[500px]:w-1/2">
                      <FormInput
                        {...{
                          title: t("address"),
                          name: "address",
                          id: "address",
                          iconName: "address",
                          placeholder: t("address"),
                          value: formik.values.address,
                          onChange: formik.handleChange,
                          onBlur: formik.handleBlur,
                          error: formik.errors.address,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:shadow-1"
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      {t("save")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2 order-first xl:order-[2]">
            <div className="rounded-sm border-bottom-0 md:border-1 border-stroke bg-white shadow-default dark:border-strokedark p-5 dark:bg-boxdark">
              <FileUpload
                {...{
                  id: "avatar",
                  name: "avatar",
                  onChange: (e) => handleSelectFile(e, 1),
                  description: t("profile_image"),
                  validMimeTypes: `PNG, JPG ${t("and")} JPEG`,
                  file: formik.values.avatar,
                  error: formik.errors.avatar,
                  imageClasses: "h-[250px] sm:h-[300px] xl:h-[250px]",
                  handleDelete: deleteFile,
                  setFile,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <CropImageModal setFile={setFile} />
      <FullScreenImage />
    </>
  );
};
export default Profile;
