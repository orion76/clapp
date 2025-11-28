# @orion76/clapp

[![npm version](https://img.shields.io/npm/v/@orion76/clapp.svg)](https://www.npmjs.com/package/@orion76/clapp)

`clapp` 框架的核心 CLI 引擎。该软件包为使用 Node.js 构建命令行应用程序提供了一个功能强大且可扩展的框架，它基于 TypeScript、Commander.js 和一个动态插件系统构建。

## 特性

- **可扩展的插件系统**：动态发现并从指定的项目目录加载命令。
- **TypeScript 优先**：完全使用 TypeScript 编写，提供完整的类型支持。
- **原生 ESM**：利用现代 ES 模块和动态 `import()` 来加载插件。
- **基于 Commander.js**：利用 Commander.js 的强大功能和灵活性进行命令解析。
- **Monorepo 就绪**：设计用于在 monorepo 环境中无缝工作。

## 安装

该软件包旨在作为 `clapp` monorepo 的一部分使用，但也可以直接安装：

```bash
npm install @orion76/clapp @orion76/clapp-command @orion76/utils
```

## 使用方法

要使用此框架创建您自己的 CLI 应用程序，请创建一个入口文件（例如 `my-cli.ts`）并配置一个 `Clapp` 实例。

**`my-cli.ts` 示例：**

```typescript
#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 在 ESM 中获取当前目录
const __dirname = dirname(fileURLToPath(import.meta.url));

// 从项目的 package.json 中获取版本
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

// CLI 应用程序配置
const config: CLIConfig = {
  name: 'my-cli',
  description: '一个使用 @orion76/clapp 构建的自定义 CLI',
  version: packageJson.version,
  // 您的命令插件所在的项目路径列表
  projects: ['/path/to/your/plugins-project'],
  commandsDirectory: 'src/commands',
  commandFindFunc: (fileName: string) =>
    fileName.endsWith('/definition.ts'),
};

// 创建并运行 CLI 应用程序
(async () => {
  try {
    const app = await Clapp.create(config);
    await app.run(process.argv);
  } catch (error) {
    console.error('启动应用程序时出错:', error);
    process.exit(1);
  }
})();
```

### 配置 (`CLIConfig`)

- `name`: 您的 CLI 应用程序的名称。
- `description`: 简短描述。
- `version`: 您的应用程序的版本。
- `projects`: 包含命令插件的项目的绝对路径数组。
- `commandsDirectory`: 每个项目中包含命令的子目录（例如 `src/commands`）。
- `commandFindFunc`: 一个函数，如果文件是命令定义文件，则返回 `true`。

## 使 CLI 可全局执行

为了能在终端的任何位置运行您的 CLI 应用程序，您需要使其全局可用。这主要涉及两个步骤：使入口脚本可执行，并将其链接到系统 `PATH` 中的一个目录。

### 1. 在您的入口文件中添加 Shebang

第一步是告诉操作系统*如何*执行您的脚本。您可以通过在主入口文件（例如 `my-cli.ts`）的顶部添加一个 "shebang" 行来实现。

shebang `#!/usr/bin/env tsx` 告诉系统使用 `tsx` 解释器来运行该文件。`tsx` 是一个允许您直接执行 TypeScript 文件而无需预先将其编译为 JavaScript 的工具。

您的入口文件应如下所示：

```typescript
#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
// ... 您的其余代码
```

**注意：** 为了让 `#!/usr/bin/env tsx` shebang 生效，您的系统上必须全局安装 `tsx`。如果您尚未安装，可以使用 npm 进行安装：

```bash
npm install -g tsx
```

添加 shebang 后，您需要通过在终端中运行以下命令使脚本可执行：

```bash
chmod +x /path/to/your/my-cli.ts
```

### 2. 创建符号链接

现在您的脚本是可执行的了，您可以通过在系统 `PATH` 的一个目录中为它创建一个符号链接（symlink），使其可以从任何目录访问。在 macOS 和 Linux 上，一个常见的目录是 `/usr/local/bin`。

符号链接就像是您文件的一个快捷方式。

要创建符号链接，请使用 `ln -s` 命令。您可能需要使用 `sudo`，因为 `/usr/local/bin` 是一个系统目录。

```bash
sudo ln -s /path/to/your/my-cli.ts /usr/local/bin/my-cli
```

让我们分解一下这个命令：
*   `sudo`: 以管理员权限执行命令。
*   `ln -s`: 创建符号链接的命令。
*   `/path/to/your/my-cli.ts`: 您的可执行入口脚本的绝对路径。
*   `/usr/local/bin/my-cli`: 您正在创建的链接的位置和名称。这将是您在终端中输入的命令。

完成这些步骤后，您可以打开一个新的终端会话，并通过简单地输入其新名称从任何地方运行您的应用程序：

```bash
my-cli --version
my-cli my-command --my-option "hello world"
```

## 插件开发

插件是一个独立的命令。CLI 引擎通过在配置的项目路径中查找 `definition.ts` 文件来发现插件。

典型的插件结构：

```
my-plugin-project/
└── src/
    ├── commands/
    │   └── my-command/
    │       └── definition.ts  // 命令定义
    └── plugins/
        └── my-command-plugin.ts // 插件逻辑
```

**`definition.ts` 示例：**

```typescript
import { ICommandConfig, PLUGIN_COMMAND_TYPE } from '@orion76/clapp-command';
import { MyCommandPlugin } from '../../plugins/my-command-plugin.js';

const myCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'my-command',
  label: '我的命令的简短标签',
  description: '这是我的自定义命令',
  pluginClass: MyCommandPlugin,
  options: [
    {
      long: 'my-option',
      description: '命令的自定义选项',
      type: 'string',
      required: true
    }
  ]
};

export default myCommand;
```

## 许可证

MIT
