import { SolidityInputWithTypeProps } from ".";
import { formatHint, validateSolidityInput } from "./helpers";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import { FormHelperText } from "tw-components";

export const SolidityRawInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  solidityComponents,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;
  const typeWithoutArray = solidityType.replace("[]", "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    form.setValue(inputName, value);

    const invalidInputError = {
      type: "pattern",
      message: `Invalid input. Input should be passed in JSON format with valid values.`,
    };

    const trimmedValue = value.trim();

    if (trimmedValue?.startsWith("[") && trimmedValue?.endsWith("]")) {
      try {
        const parsedValue: string[] = JSON.parse(trimmedValue);

        form.clearErrors(inputName);
        const isValid = parsedValue.every(
          (item) => !validateSolidityInput(item, typeWithoutArray),
        );
        if (!isValid) {
          form.setError(inputName, invalidInputError);
        } else {
          form.clearErrors(inputName);
        }
      } catch (error) {
        form.setError(inputName, invalidInputError);
      }
    } else {
      form.setError(inputName, invalidInputError);
    }
  };

  return (
    <>
      <Textarea
        fontFamily="mono"
        placeholder={solidityType}
        {...(inputProps as TextareaProps)}
        onChange={handleChange}
      />
      <FormHelperText>
        Input should be passed in JSON format - Ex:{" "}
        {formatHint(solidityType, solidityComponents)}
      </FormHelperText>
    </>
  );
};
