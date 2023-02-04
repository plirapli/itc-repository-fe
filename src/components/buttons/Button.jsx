import { Icon } from '@iconify/react';

const Button = ({
  type = 'iconRight',
  styleType = 'primary',
  text = 'Text Button',
  icon = 'uil:icons',
  ...props
}) => {
  const baseStyle =
    'flex items-center justify-center text-white rounded transition-all';
  const buttonStyles = [
    { type: 'primary', style: 'bg-primary shadow-sm hover:bg-opacity-80' },
    {
      type: 'secondary',
      style: 'bg-secondary text-primary shadow-sm hover:bg-secondaryHover',
    },
    {
      type: 'gray',
      style:
        'bg-black bg-opacity-10 text-black text-opacity-70 hover:bg-opacity-20',
    },
    {
      type: 'danger',
      style: 'bg-danger-sub text-danger-main hover:bg-danger-hover',
    },
    {
      type: 'transparent',
      style: 'shadow-none hover:bg-white hover:bg-opacity-25',
    },
  ];
  const responsive = props.isResponsive ? 'p-2.5 sm:px-4 sm:py-2' : 'px-4 py-2';
  let { style } =
    buttonStyles.filter((btn) => btn.type === styleType)[0] || buttonStyles[0];
  style = `${type !== 'iconOnly' && responsive} ${baseStyle} ${style}`;

  if (type === 'iconLeft') {
    return <ButtonIconLeft style={style} text={text} icon={icon} {...props} />;
  } else if (type === 'iconRight') {
    return <ButtonIconRight style={style} text={text} icon={icon} {...props} />;
  } else if (type === 'iconOnly') {
    return <ButtonIconOnly style={style} icon={icon} {...props} />;
  } else {
    return <ButtonTextOnly style={style} text={text} {...props} />;
  }
};

const ButtonIconRight = ({ style, text, icon, ...props }) => {
  return (
    <button
      type={props?.attrType}
      onClick={props?.onClick}
      className={`${style} gap-3`}
    >
      <div className={`font-medium ${props.textClassName}`}>{text}</div>
      <div className='w-5'>
        <Icon icon={icon} width='100%' />
      </div>
    </button>
  );
};

const ButtonIconLeft = ({ style, text, icon, ...props }) => {
  return (
    <button
      type={props?.attrType}
      onClick={props?.onClick}
      className={`${style} flex-row-reverse gap-3`}
    >
      <div className={`font-medium ${props.textClassName}`}>{text}</div>
      <div className='w-5'>
        <Icon icon={icon} width='100%' />
      </div>
    </button>
  );
};

const ButtonIconOnly = ({ onClick, style, icon, ...props }) => {
  return (
    <button
      onClick={onClick}
      type={props?.attrType}
      className={`${style} p-2.5`}
    >
      <div className='w-5'>
        <Icon icon={icon} width='100%' />
      </div>
    </button>
  );
};

const ButtonTextOnly = ({ style, text, ...props }) => {
  return (
    <button
      type={props?.attrType}
      onClick={props?.onClick}
      className={`w-full ${style}`}
    >
      <div className={`font-medium ${props.textClassName}`}>{text}</div>
    </button>
  );
};

export default Button;
