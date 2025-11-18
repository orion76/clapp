# CLI Library (clapp)

TypeScript библиотека для создания CLI-приложений с системой плагинов.

## Установка

```bash
npm install clapp
```

## Использование

### 1. Только типы (для создания плагинов команд)

Если вы хотите только типы для создания собственных команд-плагинов:

```typescript
import { ICommandConfig, IPluginCommand, PluginCommandBase } from 'clapp/types';

// Используйте типы для создания плагинов
class MyCommand extends PluginCommandBase implements IPluginCommand {
  action(args: string[], options: Record<string, unknown>): void {
    console.log('Hello from my command!');
  }
}
```

### 2. Полная CLI библиотека (для создания приложений)

Если вы хотите создать полноценное CLI-приложение:

```typescript
import { Clapp, CLIConfig } from 'clapp/cli';

const config: CLIConfig = {
  name: 'my-app',
  description: 'My CLI application',
  version: '1.0.0',
  commandsDirectory: './commands'
};

const app = Clapp.create(config);
app.run();
```

### 3. Полный набор (обратная совместимость)

```typescript
import { Clapp, CLIConfig, ICommandConfig } from 'clapp';
```

## Entry Points

- `clapp` - полный набор (рекомендуется для новых проектов)
- `clapp/types` - только типы для создания плагинов
- `clapp/cli` - только CLI библиотека для создания приложений

## Архитектура

Библиотека разделена на два основных компонента:

1. **Типы плагинов** - интерфейсы и типы для создания команд
2. **CLI реализация** - классы для создания и запуска CLI-приложений

## Сборка

```bash
npm run build
```

Создает 6 файлов в папке `dist/`:
- `index.js` / `index.d.ts` - полный бандл
- `types.js` / `types.d.ts` - только типы
- `cli.js` / `cli.d.ts` - только CLI библиотека