# @orion76/clapp

[![npm version](https://img.shields.io/npm/v/@orion76/clapp.svg)](https://www.npmjs.com/package/@orion76/clapp)

Основной движок CLI для фреймворка `clapp`. Этот пакет предоставляет мощный и расширяемый фреймворк для создания консольных приложений на Node.js, построенный с использованием TypeScript, Commander.js и динамической системы плагинов.

## Особенности

- **Расширяемая система плагинов**: Динамически находит и загружает команды из указанных директорий проектов.
- **TypeScript First**: Полностью написан на TypeScript с полной поддержкой типов.
- **ESM Native**: Использует современные ES-модули с динамическим `import()` для загрузки плагинов.
- **На базе Commander.js**: Использует мощь и гибкость Commander.js для парсинга команд.
- **Готов к Monorepo**: Разработан для бесшовной работы в окружении монорепозитория.

## Установка

Этот пакет предназначен для использования в составе монорепозитория `clapp`, но его также можно установить напрямую:

```bash
npm install @orion76/clapp @orion76/clapp-command @orion76/utils
```

## Использование

Чтобы создать собственное CLI-приложение с помощью этого фреймворка, создайте файл точки входа (например, `my-cli.ts`) и настройте экземпляр `Clapp`.

**Пример `my-cli.ts`:**

```typescript
#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Получение текущей директории в ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Получение версии из package.json вашего проекта
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

// Конфигурация CLI-приложения
const config: CLIConfig = {
  name: 'my-cli',
  description: 'Пользовательское CLI, созданное с помощью @orion76/clapp',
  version: packageJson.version,
  // Список путей, где расположены ваши плагины команд
  projects: ['/path/to/your/plugins-project'],
  commandsDirectory: 'src/commands',
  commandFindFunc: (fileName: string) =>
    fileName.endsWith('/definition.ts'),
};

// Создание и запуск CLI-приложения
(async () => {
  try {
    const app = await Clapp.create(config);
    await app.run(process.argv);
  } catch (error) {
    console.error('Ошибка запуска приложения:', error);
    process.exit(1);
  }
})();
```

### Конфигурация (`CLIConfig`)

- `name`: Название вашего CLI-приложения.
- `description`: Краткое описание.
- `version`: Версия вашего приложения.
- `projects`: Массив абсолютных путей к проектам, содержащим плагины команд.
- `commandsDirectory`: Поддиректория в каждом проекте, где находятся команды (например, `src/commands`).
- `commandFindFunc`: Функция, которая возвращает `true`, если файл является файлом определения команды.

## Глобальный запуск CLI-приложения

Чтобы запускать ваше CLI-приложение из любого места в терминале, его нужно сделать глобально доступным. Это включает два основных шага: сделать главный скрипт исполняемым и связать его с директорией, входящей в системную переменную `PATH`.

### 1. Добавьте Shebang в ваш главный файл

Первый шаг — указать операционной системе, *как* исполнять ваш скрипт. Это делается добавлением строки "shebang" в самое начало вашего главного файла (например, `my-cli.ts`).

Shebang `#!/usr/bin/env tsx` говорит системе использовать интерпретатор `tsx` для запуска файла. `tsx` — это инструмент, который позволяет выполнять файлы TypeScript напрямую, без предварительной компиляции в JavaScript.

Ваш главный файл должен выглядеть так:

```typescript
#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
// ... остальной код
```

**Примечание:** Чтобы shebang `#!/usr/bin/env tsx` работал, у вас должен быть глобально установлен `tsx`. Если вы еще этого не сделали, установите его с помощью npm:

```bash
npm install -g tsx
```

После добавления shebang, вам нужно сделать скрипт исполняемым, выполнив следующую команду в терминале:

```bash
chmod +x /path/to/your/my-cli.ts
```

### 2. Создайте символическую ссылку

Теперь, когда ваш скрипт стал исполняемым, вы можете сделать его доступным из любой директории, создав на него символическую ссылку (symlink) в директории, которая является частью системной переменной `PATH`. На macOS и Linux для этого часто используется `/usr/local/bin`.

Символическая ссылка — это как ярлык для вашего файла.

Для создания символической ссылки используйте команду `ln -s`. Скорее всего, вам понадобится `sudo`, так как `/usr/local/bin` — это системная директория.

```bash
sudo ln -s /path/to/your/my-cli.ts /usr/local/bin/my-cli
```

Разберем эту команду:
*   `sudo`: Выполняет команду с правами администратора.
*   `ln -s`: Команда для создания символической ссылки.
*   `/path/to/your/my-cli.ts`: Абсолютный путь к вашему исполняемому главному скрипту.
*   `/usr/local/bin/my-cli`: Местоположение и имя создаваемой ссылки. Это та команда, которую вы будете вводить в терминале.

После выполнения этих шагов вы можете открыть новую сессию терминала и запускать ваше приложение из любого места, просто набрав его новое имя:

```bash
my-cli --version
my-cli my-command --my-option "hello world"
```

## Разработка плагинов

Плагин — это самодостаточная команда. Движок CLI находит плагины, ища файлы `definition.ts` в настроенных путях проектов.

Типичная структура плагина:

```
my-plugin-project/
└── src/
    ├── commands/
    │   └── my-command/
    │       └── definition.ts  // Определение команды
    └── plugins/
        └── my-command-plugin.ts // Логика плагина
```

**Пример `definition.ts`:**

```typescript
import { ICommandConfig, PLUGIN_COMMAND_TYPE } from '@orion76/clapp-command';
import { MyCommandPlugin } from '../../plugins/my-command-plugin.js';

const myCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'my-command',
  label: 'Краткое название моей команды',
  description: 'Это моя пользовательская команда',
  pluginClass: MyCommandPlugin,
  options: [
    {
      long: 'my-option',
      description: 'Пользовательская опция для команды',
      type: 'string',
      required: true
    }
  ]
};

export default myCommand;
```

## Лицензия

MIT
