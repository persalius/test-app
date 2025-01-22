## Інформація про компонент Select:

1. Реалізовано за стандартами WAI-ARIA .
2. У цьому прикладі дані завантажуються на клієнті, а не на сервері.
3. Відразу ж завантажується 500 елементів, щоб відразу показати, як це працює в меню.
4. Реалізовано тільки необхідні пропси.

## Пропозиції як можна поліпшити компонент Select:
1. Початковий список завантажувати на сервері.
2. Завантажувати дані під час скролу в меню селекта. Таким чином немає необхідності відразу завантажувати величезний масив даних, що добре відобразиться на продуктивності.
3. Написати компонент використовуючи архітектуру як у React-aria-components / NextUi / Shadcn
#### Приклад:
```bash
<MySelect label="Pick an engineering major" items={options}>
    {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
</MySelect>

<MySelect label="Ice cream flavor">
  <MyItem>Chocolate</MyItem>
  <MyItem>Mint</MyItem>
  <MyItem>Strawberry</MyItem>
  <MyItem>Vanilla</MyItem>
</MySelect>
```
4. Додати всі необхідні пропси, такі як isLoading, isDisabled, isOpen, placeholder, className / classNames.
5. Зробити можливим, щоб компонент був контрольованим. Наприклад для бібліотеки react-hook-form.

## Використовувані технології:
TanStack Query / Virtual, Next.js (для швидкості запуску проєкту), TaiwindCSS, Framer-Motion.

## Getting Started
```bash
npm i
npm run dev
```