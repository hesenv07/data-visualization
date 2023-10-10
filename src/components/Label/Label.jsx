export const Label = ({ title, htmlFor, size }) => {
  return (
    <label className={`mb-3 block text-${size || 'sm'} font-medium`} htmlFor={htmlFor}>
      {title}
    </label>
  );
};
