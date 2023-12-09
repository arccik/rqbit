import { Alert } from "react-bootstrap";
import { ErrorType } from "../api-types";

export const ErrorComponent = (props: {
  error: ErrorType | null;
  remove?: () => void;
}) => {
  let { error, remove } = props;

  if (error == null) {
    return null;
  }

  return (
    <Alert variant="danger" onClose={remove} dismissible={remove != null}>
      <Alert.Heading>{error.text}</Alert.Heading>
      {error.details?.statusText && (
        <p>
          <strong>{error.details?.statusText}</strong>
        </p>
      )}
      <pre>{error.details?.text}</pre>
    </Alert>
  );
};
