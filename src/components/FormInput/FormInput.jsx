import { forwardRef } from "react"
import { Label } from "components";
import { Icon } from "shared";

export const FormInput = forwardRef(function FormInput({
  iconName,
  name,
  id,
  title,
  type = "text",
  error,
  autoComplete = "off",
  iconClasses,
  disableDarkStyles=false,
  appearGroup,
  elemProps,
  elem,
  ...rest
}, ref) {
  const Component = elem

  return (
    <>
      <Label title={title} htmlFor={id} />

      <div className="relative">
        {iconName 
          ? (
            <span className="absolute left-4.5 top-4">
              <Icon name={iconName} classes={iconClasses} />
            </span>
        
          ) 
          : appearGroup 
              ? <Component {...{...elemProps, onChange: rest.onChange}} />
              : ''
        }        

        <input
          className={`w-full rounded border border-stroke bg-gray py-3 ${appearGroup ? 'pl-20' : 'pl-11.5'} pr-4.5 text-black focus-visible:outline-none ${
            error
              ? "!border-[#D34053]"
              : `focus:border-primary ${!disableDarkStyles ? 'dark:border-strokedark dark:focus:border-primary' : ''}`
          }
          ${!disableDarkStyles ? 'dark:bg-meta-4 dark:text-white' : ''}`
        }
          type={type}
          name={name}
          id={id}
          autoComplete={autoComplete}
          ref={ref}
          {...rest}
        />
      </div>

      {error ? <div className="text-sm text-danger mt-1">{error}</div> : null}
    </>
  );
});
