const Select = ({
  onChange,
  color = 'primary',
  label,
  value,
  children,
  ...props
}) => {
  const textStyle = color === 'primary' && 'text-primary';
  const style = color === 'primary' ? 'input-primary' : 'input-secondary';

  return (
    <>
      {label && (
        <label className={`min-w-max text-sm font-medium ${textStyle}`}>
          {label}
        </label>
      )}
      <select
        className={`block w-full pl-3 pr-10 py-[9px] rounded-md shadow-sm focus-primary sm:text-sm ${style}`}
        value={value}
        onChange={onChange}
        required
      >
        {children}
      </select>
    </>
  );
};

export default Select;
