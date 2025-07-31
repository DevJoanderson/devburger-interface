import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ContainerButton } from './styles';

export function Button({ children, to, ...props }) {
  if (to) {
    return (
      <ContainerButton as={Link} to={to} {...props}>
        {children}
      </ContainerButton>
    );
  }

  return <ContainerButton {...props}>{children}</ContainerButton>;
}

Button.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};
