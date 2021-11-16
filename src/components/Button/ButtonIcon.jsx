export const ButtonIcon = ({ Icon, onClick, className, ...rest }) => (
  <button {...rest} type="button" onClick={onClick} className={className}>
    <Icon />
  </button>
);
