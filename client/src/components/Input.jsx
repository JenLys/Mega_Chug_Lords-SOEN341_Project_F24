// eslint-disable-next-line react/prop-types
const Input = ({ id, placeholder, label, register, validationRules, type="text" }) => (
  <div className="input-box">
    <label>{label}</label>
    <input placeholder={placeholder} type={type} {...register(id, validationRules)} />
  </div>
);

export default Input;