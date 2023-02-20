const Tags = ({ divName }) => {
  const className = divName?.split(' ').join('');
  return (
    <div className={`w-fit px-1.5 text-white text-xs rounded bg ${className}`}>
      {divName}
    </div>
  );
};

export default Tags;
