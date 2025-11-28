export interface IPackageJson {
  name: string;
  version: string;
  description?: string; // Optional field
  keywords?: string[];
  homepage?: string;
  bugs?: {
    url?: string;
    email?: string;
  };
  license?: string;
  author?:
    | string
    | {
        name: string;
        email?: string;
        url?: string;
      };
  contributors?: (
    | string
    | {
        name: string;
        email?: string;
        url?: string;
      }
  )[];
  files?: string[];
  main?: string;
  browser?: string;
  bin?:
    | string
    | {
        [key: string]: string;
      };
  man?: string | string[];
  directories?: {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
  };
  repository?:
    | string
    | {
        type: string;
        url: string;
        directory?: string;
      };
  scripts?: {
    [key: string]: string;
  };
  config?: {
    [key: string]: any;
  };
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  peerDependencies?: {
    [key: string]: string;
  };
  optionalDependencies?: {
    [key: string]: string;
  };
  engines?: {
    node?: string;
    npm?: string;
    [key: string]: string | undefined;
  };
  os?: string[];
  cpu?: string[];
  private?: boolean;
  publishConfig?: {
    registry?: string;
    access?: 'public' | 'restricted';
    [key: string]: any;
  };
  // TypeScript specific fields
  types?: string; // or "typings"
  typesVersions?: {
    [key: string]: {
      [key: string]: string[];
    };
  };
  // Add other fields as needed
  [key: string]: any; // Allow for arbitrary additional fields
}
