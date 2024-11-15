const Input = ({
  className = "",
  id,
  placeholder,
  label,
  register,
  validationRules = null,
  type = "text",
  required = false,
}) => (
  <div className={`${className}`}>
    <label>{label}</label>
    <input
      required={required}
      placeholder={placeholder}
      type={type}
      {...register(id, validationRules)}
    />
  </div>
);

export default Input;
