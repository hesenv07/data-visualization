import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "shared";
import { t } from "i18next";
import { openModal, setModalData } from "store";

export const FileUpload = ({
  name,
  id,
  error,
  validMimeTypes,
  description,
  file,
  imageClasses,
  handleDelete,
  ...rest
}) => {
  const fileRef = useRef("");
  const dispatch = useDispatch();

  const handleOpenImageFullScreen = (e) => {
    e.stopPropagation();
    dispatch(openModal("fullscreen_image"));
    dispatch(setModalData({ key: "fullscreenImage", value: file }));
  };
  const handleClickToUpload = () => {
    //upload with div
    fileRef.current.click();
  };
  return (
    <div className="flex flex-col gap-2 ">
      <div className={`btn-group z-99 flex gap-2 items-center`}>
        <button
          className="flex justify-center rounded bg-danger py-2 px-4 font-medium text-white hover:shadow-1"
          type="button"
          onClick={() => handleDelete(name, fileRef)}
        >
          <Icon name="trashIcon" />
        </button>

        <button
          className="flex justify-center rounded bg-primary py-2 px-4 font-medium text-white hover:shadow-1"
          type="button"
          onClick={() => fileRef.current.click()}
        >
          <Icon name="editIcon" />
        </button>
      </div>

      <div
        id={id}
        className={`block relative w-full appearance-none rounded border-2 border-dashed !border-${
          error ? "[#D34053]" : "primary"
        } bg-gray ${
          !file ? "py-4 px-4 sm:py-7.5 cursor-pointer" : "p-1"
        } dark:bg-meta-4`}
      >
        <input
          type="file"
          name={name}
          ref={fileRef}
          accept={"image/*"}
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          {...rest}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          {file ? (
            <>
              <img
                src={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
                className={`w-[100%] z-99 rounded ${
                  imageClasses ||
                  "h-[240px] sm:h-[300px] lg:h-[200px] xl:h-[225px]"
                } cursor-pointer`}
                onClick={handleOpenImageFullScreen}
              />
            </>
          ) : (
            <>
              <div
                onClick={handleClickToUpload}
                className="flex items-center flex-col"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                  <Icon name="upload" />
                </span>
                <h3>{description}</h3>
                <p className="text-center">
                  <span className="text-primary">{t("click_to_upload")}</span>{" "}
                  {t("or")} {t("drag_drop")}
                </p>
                <p className="mt-1.5">{validMimeTypes}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {error ? <div className="text-sm text-danger mt-2">{error}</div> : null}
    </div>
  );
};
