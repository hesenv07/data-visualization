import { forwardRef } from "react";
import PropTypes from "prop-types";

export const Select = forwardRef(function Select(
  {
    options,
    title,
    defaultChecked,
    classes,
    onChange,
    isActive,
    placeholder,
    error,
    name,
    isTouched,
    ...params
  },
  ref
) {
  let errMessage = null;
  if (isTouched) {
    errMessage = isTouched(name) ? error : "";
  }

  return (
    <div className={`form-group ${classes}`}>
      {title && (
        <label className="block mb-3 text-4 text-input-text-color">
          {title}
        </label>
      )}
      <select
        className={`w-full h-[50px] border-[1px] bg-white border-solid ${
          errMessage ? "border-red-300" : "border-slate-300"
        } block rounded-lg ${
          isActive ? "text-gray-900" : "text-input-text-color"
        } px-5`}
        value={defaultChecked}
        onChange={onChange}
        ref={ref}
        {...{ name }}
        {...params}
      >
        {placeholder && (
          <option disabled value={""}>
            {placeholder}
          </option>
        )}
        {options?.map(({ id, name }) => (
          <option value={id} key={id}>
            {name}
          </option>
        ))}
      </select>

      <p
        className={`text-base text-red-500 mt-2 leading-6 ${
          errMessage?.length ? "opacity-100" : "opacity-0"
        }`}
      >
        {errMessage}
      </p>
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.array,
  defaultChecked: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
  onChange: PropTypes.func,
  isActive: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isTouched: PropTypes.func,
  name: PropTypes.string,
};
