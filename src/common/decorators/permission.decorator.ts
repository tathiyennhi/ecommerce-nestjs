import { Reflector } from '@nestjs/core';

export const Permisisons = Reflector.createDecorator<string[]>();