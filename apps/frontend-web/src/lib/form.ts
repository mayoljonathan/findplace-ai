import { UseFormSetError } from "react-hook-form";
import { ApiError } from "../types";

export const setApiErrorToForm = ({
  setError,
  errors,
}: {
  setError: UseFormSetError<any>;
  errors: ApiError["errors"];
}) => {
  errors?.forEach((item) => {
    if (item.property) {
      setError(item.property, {
        message: item.messages[0],
      });
    }
  });
};
