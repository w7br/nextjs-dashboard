import {
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import type { OptionalPropertiesInput } from "@thirdweb-dev/sdk";
import { FileInput } from "components/shared/FileInput";
import React, { useEffect } from "react";
import {
  ArrayPath,
  Control,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  WatchObserver,
  useFieldArray,
} from "react-hook-form";
import { FiPlus, FiSlash, FiTrash, FiUpload, FiX } from "react-icons/fi";
import { Button, FormErrorMessage, FormLabel } from "tw-components";
// import { optionalProperties } from "schema/shared";
import { z } from "zod";

interface IPropertyFieldValues extends FieldValues {
  attributes?: z.input<typeof OptionalPropertiesInput>;
}

interface IPropertiesFormControlProps<
  TFieldValues extends IPropertyFieldValues,
> {
  control: Control<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors;
  setValue: UseFormSetValue<TFieldValues>;
}

export const PropertiesFormControl = <
  TFieldValues extends IPropertyFieldValues,
>({
  control,
  register,
  watch,
  errors,
  setValue,
}: React.PropsWithChildren<IPropertiesFormControlProps<TFieldValues>>) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "attributes" as ArrayPath<TFieldValues>,
  });

  useEffect(() => {
    append({ trait_type: "", value: "" } as any, { shouldFocus: false });
    // should only run on mount to set a first property
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={4}>
      <Flex justify="space-between" align="center" direction="row">
        <FormLabel m={0}>Properties</FormLabel>
        <Button
          rightIcon={<Icon as={FiSlash} />}
          variant="outline"
          colorScheme="red"
          size="xs"
          onClick={() => replace([{ trait_type: "", value: "" } as any])}
        >
          Reset
        </Button>
      </Flex>
      {fields.map((field, index) => {
        const keyError = errors?.attributes?.[index]?.trait_type?.message;
        const valueError = errors?.attributes?.[index]?.value?.message;
        const isInvalid = !!(keyError || valueError);

        return (
          <Stack key={field.id} align="center" direction="row">
            <FormControl
              isInvalid={isInvalid}
              as={Stack}
              direction="row"
              align="top"
            >
              <FormControl isInvalid={!!keyError}>
                <Input
                  {...register(
                    `attributes.${index}.trait_type` as Path<TFieldValues>,
                  )}
                  placeholder="trait_type"
                ></Input>
                <FormErrorMessage>{keyError}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!valueError}>
                {watch(
                  `attributes.${index}.value` as unknown as WatchObserver<TFieldValues>,
                ) instanceof File ? (
                  <InputGroup>
                    <Input
                      isDisabled
                      value={
                        watch(`attributes.${index}.value` as Path<TFieldValues>)
                          .name
                      }
                    />
                    <InputRightElement>
                      <Icon
                        as={FiTrash}
                        cursor="pointer"
                        color="red.300"
                        _hover={{ color: "red.200" }}
                        onClick={() =>
                          setValue(
                            `attributes.${index}.value` as Path<TFieldValues>,
                            "" as UnpackNestedValue<
                              PathValue<TFieldValues, Path<TFieldValues>>
                            >,
                          )
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                ) : (
                  <InputGroup>
                    <Input
                      {...register(
                        `attributes.${index}.value` as Path<TFieldValues>,
                      )}
                      placeholder="value"
                    />
                    <InputRightElement>
                      <Tooltip label="Upload file">
                        <FileInput
                          setValue={(file) => {
                            setValue(
                              `attributes.${index}.value` as Path<TFieldValues>,
                              file as UnpackNestedValue<
                                PathValue<TFieldValues, Path<TFieldValues>>
                              >,
                            );
                          }}
                        >
                          <Icon
                            as={FiUpload}
                            color="gray.600"
                            _hover={{ color: "gray.500" }}
                          />
                        </FileInput>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                )}
                <FormErrorMessage>{valueError}</FormErrorMessage>
              </FormControl>
            </FormControl>
            <IconButton
              onClick={() => remove(index)}
              colorScheme="red"
              variant="ghost"
              aria-label="remove key value pair"
              size="xs"
              icon={<Icon as={FiX} />}
            />
          </Stack>
        );
      })}
      <Stack direction="row">
        <Button
          leftIcon={<Icon as={FiPlus} />}
          colorScheme="purple"
          size="sm"
          onClick={() =>
            append({ trait_type: undefined, value: undefined } as any)
          }
        >
          Add Row
        </Button>
      </Stack>
    </Stack>
  );
};
