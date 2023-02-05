import { Icon } from '@iconify/react';

const Button = ({
  type = 'button',
  variant = 'text-only',
  color = 'primary',
  children,
  ...props
}) => {
  const baseStyle = 'flex items-center justify-center rounded transition-all';
  const responsive =
    variant !== 'icon-only' &&
    (props.isResponsive ? 'p-2.5 sm:px-4 sm:py-2' : 'px-4 py-2');
  const style = `${baseStyle} ${variant} btn ${color} ${responsive}`;
  const textStyle = `font-medium ${props.isResponsive && 'hidden sm:block'}`;

  return (
    <button type={type} onClick={props?.onClick} className={style}>
      {/* Btn Text */}
      {variant !== 'icon-only' && <p className={textStyle}>{children}</p>}

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
