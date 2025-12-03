/**
 * Types for describing command options
 */

export interface ICommandOption {
  short?: string;
  name: string;
  description: string;
  defaultValue?: unknown;
  required?: boolean;
  type?: 'string' | 'boolean' | 'number';
  choices?: string[];
} /**
 * Types for describing command arguments
 */

export interface ICommandArgument {
  name: string;
  description: string;
  required?: boolean;
  variadic?: boolean;
  choices?: string[];
}
