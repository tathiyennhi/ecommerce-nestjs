import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

// Định nghĩa constraint
@ValidatorConstraint({ async: false })
export class IsGreaterOrEqualThanZeroConstraint
  implements ValidatorConstraintInterface
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(quantity: any, _args: ValidationArguments) {
    return typeof quantity === "number" && quantity >= 0; // Kiểm tra quantity là số và lớn hơn 0
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_args: ValidationArguments) {
    return "Quantity must be greater than 0";
  }
}

// Định nghĩa decorator sử dụng constraint
export function IsGreaterOrEqualThanZero(
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGreaterOrEqualThanZeroConstraint,
    });
  };
}
