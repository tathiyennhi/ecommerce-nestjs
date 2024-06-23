import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

// Định nghĩa constraint
@ValidatorConstraint({ async: false })
export class IsGreaterThanZeroConstraint
  implements ValidatorConstraintInterface
{
  validate(quantity: any, args: ValidationArguments) {
    return typeof quantity === "number" && quantity > 0; // Kiểm tra quantity là số và lớn hơn 0
  }

  defaultMessage(args: ValidationArguments) {
    return "Quantity must be greater than 0";
  }
}

// Định nghĩa decorator sử dụng constraint
export function IsGreaterThanZero(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGreaterThanZeroConstraint,
    });
  };
}
