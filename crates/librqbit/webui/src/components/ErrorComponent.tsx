// import { Alert } from "react-bootstrap";
import { ErrorDetails as ApiErrorDetails, ErrorType } from "@/api-types";

export const ErrorComponent = (props: {
  error: ErrorType | null;
  remove?: () => void;
}) => {
  let { error, remove } = props;

  if (error == null) {
    return null;
  }
  return null;
  // return (
  //   <Alert variant="danger" onClose={remove} dismissible={remove != null}>
  //     <Alert.Heading>{error.text}</Alert.Heading>

  //     <ErrorDetails details={error.details} />
  //   </Alert>
  // );
};

const ErrorDetails = (props: {
  details: ApiErrorDetails | null | undefined;
}) => {
  let { details } = props;
  if (!details) {
    return null;
  }
  return (
    <>
      {details.statusText && (
        <p>
          <strong>{details.statusText}</strong>
        </p>
      )}
      <pre>{details.text}</pre>
    </>
  );
};
