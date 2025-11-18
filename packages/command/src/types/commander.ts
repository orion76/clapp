
/**
 * Types for describing command options
 */

export interface ICommandOption {
  short?: string;
  long: string;
  description: string;
  defaultValue?: string | boolean | number;
  required?: boolean;
  type?: 'string' | 'boolean' | 'number';
}/**
 * Types for describing command arguments
 */

export interface ICommandArgument {
  name: string;
  description: string;
  required?: boolean;
  variadic?: boolean;
}

