const Input = ({ label, type = 'text', color = 'primary', ...props }) => {
  const textStyle = color === 'primary' && 'text-primary';
  const style = color === 'primary' ? 'input-primary' : 'input-secondary';

  return (
    <>
      {label && (
        <label className={`block text-sm font-medium ${textStyle}`}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${
          label && 'mt-1'
        } block w-full rounded-md shadow-sm focus-primary sm:text-sm ${style}`}
        {...props}
      />
    </>
  );
};

export default Input;
