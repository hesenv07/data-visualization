import { useEffect, useRef } from "react";
import { Icon } from "shared";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const DragDropUpload = ({
  files,
  func,
  isSuccess,
  text = "Upload a Project Brief file",
  errMess = "Please upload your resume",
  noFormik = false,
}) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const dragDropClasses = classnames(
    {
      "py-[68px] h-full": !files,
      "min-h-[256px] h-full": files,
    },
    "relative z-50 cursor-pointer border-2 border-dashed border-blue-100 rounded-lg bg-[#FAFCFF] w-full flex justify-center items-center"
  );

  const dragStartHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    func(e?.dataTransfer?.files[0]);
  };

  useEffect(() => {
    if (files && isSuccess) {
      func(null);
    }
  }, [files, func, isSuccess]);

  return (
    <>
      <div
        className={dragDropClasses}
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragLeaveHandler(e)}
        onDrop={(e) => dropHandler(e)}
        onClick={() => inputRef.current.click()}
      >
        {files ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col gap-2 justify-center items-center text-slate-700">
              <span>{files?.type}</span>
              <span>{files?.name}</span>
            </div>
            <div className="text-slate-700">
              <button
                onClick={() => func(null)}
                className="border border-solid border-input-border px-8 text-sm py-1 rounded-md hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full min-h-full flex justify-center items-center">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              hidden
              onChange={(e) => func(e.target.files[0])}
              onFocus={() => setIsFocused(true)}
              ref={inputRef}
            />
            <div className="flex flex-col items-center justify-center gap-5">
              <Icon name="drag_upload_icon" />
              <div className="flex flex-col gap-2">
                <div className="flex justify-center items-center text-base gap-1">
                  <span className="text-blue-600 font-medium">{text}</span>
                  <span className="text-slate-400">or drag and drop</span>
                </div>
                <span className="text-slate-400 text-center text-sm">
                  PDF, JPG, PNG, DOC, DOCX, XLS up to 10 MB
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!files && noFormik && (
        <p
          className={`text-base text-red-500 leading-6 -mt-3 ${
            !files ? "opacity-100" : "opacity-0"
          }`}
        >
          {errMess ?? "error message"}
        </p>
      )}
    </>
  );
};

DragDropUpload.propTypes = {
  files: PropTypes.any,
  text: PropTypes.string,
  func: PropTypes.func,
  isSuccess: PropTypes.bool,
  errMess: PropTypes.string,
  noFormik: PropTypes.bool,
};
