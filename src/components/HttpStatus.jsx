import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function HttpStatus({ children, redirectUrl }) {
  const navigate = useNavigate();
  if (redirectUrl) {
    return navigate(redirectUrl);
  }
  return <>{children}</>;
}

HttpStatus.propTypes = {
  redirectUrl: PropTypes.string,
  children: PropTypes.node
};
