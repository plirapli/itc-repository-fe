import { Icon } from '@iconify/react';

const Button = ({
  type = 'button',
  variant = 'text-only',
  color = 'primary',
  children,
  ...props
}) => {
  const baseStyle = 'flex items-center justify-center rounded transition-all';
  const style = `${baseStyle} ${variant} btn ${color}`;

  return (
    <button type={type} onClick={props?.onClick} className={style}>
      {/* Btn Text */}
      {variant !== 'icon-only' && <p className='font-medium'>{children}</p>}

      {/* Btn Icon */}
      {props?.icon && (
        <div className='w-5'>
          <Icon icon={props.icon} width='100%' />
        </div>
      )}
    </button>
  );
};

export default Button;
