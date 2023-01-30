import { Icon } from '@iconify/react';

const Button = ({
  type = 'iconRight',
  styleType = 'primary',
  text = 'Text Button',
  icon = 'uil:icons',
  ...props
}) => {
  const responsive = props.isResponsive ? 'p-2.5 sm:px-4 sm:py-2' : 'px-4 py-2';
  const baseStyle =
    'text-white rounded shadow-md transition-all hover:bg-opacity-80';
  const buttonStyles = [
    { type: 'primary', style: 'bg-primary' },
    { type: 'secondary', style: 'bg-secondary text-primary' },
    {
      type: 'transparent',
      style: 'shadow-none hover:bg-white hover:bg-opacity-25',
    },
  ];
  let { style } =
    buttonStyles.filter((btn) => btn.type === styleType)[0] || buttonStyles[0];
  style = `${responsive} ${baseStyle} ${style}`;

  if (type === 'iconLeft') {
    return <ButtonIconLeft style={style} text={text} icon={icon} {...props} />;
  } else if (type === 'iconRight') {
    return <ButtonIconRight style={style} text={text} icon={icon} {...props} />;
  } else if (type === 'textOnly') {
    return <ButtonTextOnly style={style} text={text} icon={icon} {...props} />;
  }
};

const ButtonIconRight = ({ style, text, icon, ...props }) => {
  return (
    <button className={`flex items-center gap-3 ${style}`}>
      <div className={`font-medium ${props.textClassName}`}>{text}</div>
      <div className='w-5'>
        <Icon icon={icon} width='100%' />
      </div>
    </button>
  );
};

const ButtonIconLeft = ({ style, text, icon, ...props }) => {
  return (
    <button className={`flex flex-row-reverse items-center gap-3 ${style}`}>
      <div className={`font-medium ${props.textClassName}`}>{text}</div>
      <div className='w-5'>
        <Icon icon={icon} width='100%' />
      </div>
    </button>
  );
};

const ButtonTextOnly = ({ style, text, ...props }) => {
  return (
    <button className={`w-full text-center ${style}`}>
      <div className={`font-medium ${props.textClassName}`}>{text}</div>
    </button>
  );
};

// const ButtonIconOnly = ({ icon }) => {
//   return (
//     <button
//       className={`flex gap-3 p-2.5 sm:px-4 sm:py-2.5
//           rounded shadow-md transition-all hover:bg-opacity-80 ${type.style}`}
//     >
//       <Icon icon={icon || 'uil:icons'} width='20' />
//     </button>
//   );
// };

export default Button;
