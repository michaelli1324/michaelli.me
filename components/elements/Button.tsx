import { PropsWithChildren } from 'react';
import { Button as VechaiButton } from '@vechaiui/react';

interface ButtonProps {
  active?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  onClick?: () => void;
  heading?: string;
}

const Button = ({
  className,
  color,
  children,
  onClick,
  active = false,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <VechaiButton
      className={className}
      color={color}
      onClick={onClick}
      active={active}
    >
      {children}
    </VechaiButton>
  );
};

export default Button;
