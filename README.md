# CLI App (clapp)

CLI приложение на TypeScript с использованием библиотеки Commander.

## Установка зависимостей

```bash
npm install
```

## Разработка

### Запуск в режиме разработки

```bash
npm run dev
```

### Запуск с автоматической перезагрузкой

```bash
npm run watch
```

## Сборка

```bash
npm run build
```

## Запуск собранного приложения

```bash
npm start
```

## Доступные команды

### Справка

```bash
npm run dev -- --help
```

### Команда приветствия

```bash
npm run dev hello
npm run dev hello --name "Ваше имя"
```

### Создание файла

```bash
npm run dev create-file test.txt
npm run dev create-file test.txt --content "Привет, мир!"
```

### Информация о файле

```bash
npm run dev info test.txt
```

## Глобальная установка

После сборки проекта можно установить CLI глобально:

```bash
npm run build
npm install -g .
```

После этого можно использовать команду `clapp` в любом месте:

```bash
clapp --help
clapp hello --name "Мир"
clapp create-file example.txt
clapp info example.txt
```

## Структура проекта

```
├── src/
│   └── index.ts          # Основной файл приложения
├── dist/                 # Собранные файлы (создается после npm run build)
├── tsconfig.json         # Конфигурация TypeScript
├── nodemon.json          # Конфигурация nodemon
├── package.json          # Зависимости и скрипты
└── README.md            # Данный файл
```