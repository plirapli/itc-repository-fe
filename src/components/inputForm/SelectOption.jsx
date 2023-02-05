export const Select = ({
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
      <label className={`min-w-max text-sm font-medium ${textStyle}`}>
        {label || 'Label'}
      </label>
      <select
        className={`block w-full px-3 py-[9px] rounded-md shadow-sm focus-primary sm:text-sm ${style}`}
        value={value}
        onChange={onChange}
        required
      >
        {children}
      </select>
    </>
  );
};

export const SelectOption = ({
  styleType,
  label,
  name,
  value,
  options,
  ...props
}) => {
  const textLabel = styleType === 'primary' && 'text-primary';
  const input = styleType === 'primary' ? 'input-primary' : 'input-secondary';

  return (
    <>
      <label className={`min-w-max text-sm font-medium ${textLabel}`}>
        {label || 'Label'}
      </label>
      <select
        className={`block w-full px-3 py-[9px] rounded-md shadow focus-primary sm:text-sm ${input}`}
        value={value}
        onChange={(e) => props.handler(e, name)}
      >
        {options?.map((data) => (
          <option className='bg-white' key={data.id} value={data.id}>
            {data.name}{' '}
          </option>
        ))}
      </select>
    </>
  );
};
