const Button = ({
  variant = 'text-only',
  size = 'medium',
  color = 'primary',
  children,
  icon,
  isResponsive,
  ...props
}) => {
  const baseStyle = 'flex items-center justify-center rounded transition-all';
  const responsive =
    variant !== 'icon-only'
      ? isResponsive
        ? 'p-2.5 sm:px-4 sm:py-2'
        : 'px-4 py-2'
      : '';
  const style = `btn ${baseStyle} ${variant} ${size} ${color} ${responsive}`;
  const textStyle = `font-medium text ${size} ${
    isResponsive && 'hidden sm:block'
  }`;

  return (
    <button className={style} {...props}>
      {/* Btn Text */}
      {variant !== 'icon-only' && <p className={textStyle}>{children}</p>}

      {icon && (
        <div className={size === 'small' ? 'w-[1.125rem]' : 'w-5'}>{icon}</div>
      )}
    </button>
  );
};

export default Button;
