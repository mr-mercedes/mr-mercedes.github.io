/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

export type BaseType = {
  id: string;
  name: string;
};

export type Category = {
  photo?: string;
} & BaseType;

export type Product = {
  price: number;
  desc?: string;
  createdAt: string;
  oldPrice: number;
  category: Category;
} & Required<Category>;

export type TypeCost = 'Cost';
export type TypeProfit = 'Profit';
export type TTypes = TypeCost | TypeProfit;

export type Cost = {
  amount: number;
  type: TypeCost;
} & Required<Omit<Product, 'price' | 'oldPrice'>>;

export type Profit = {
  amount: number;
  type: TypeProfit;
} & Omit<Product, 'price' | 'oldPrice'>;

export type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
const randomNumberFrom1ToMax = (max = 10): number => {
  if (max <= 0) throw Error("Function's argument must be positive");
  return Math.floor(Math.random() * max);
};
export const createRandomProduct = (createdAt: string): Product => {
  const categoryNames: Category[] = [
    { id: '1', name: 'Молочная' },
    { id: '2', name: 'Мясо', photo: 'https://product_meat.ru' },
    { id: '3', name: 'Рыба' },
    { id: '4', name: 'Фрукты' },
    { id: '5', name: 'Овощи', photo: 'https://product_vegetables.ru' },
    { id: '6', name: 'Бакалея' },
  ];
  const id = randomNumberFrom1ToMax();
  return {
    id: id.toString(),
    name: `Random product ${id}`,
    desc: `Some description ${id}`,
    category: categoryNames[randomNumberFrom1ToMax(categoryNames.length) - 1],
    createdAt: createdAt,
    oldPrice: randomNumberFrom1ToMax(1000),
    photo: 'https://some_url_address.ru',
    price: randomNumberFrom1ToMax(900),
  };
};
/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const types: TTypes[] = ['Cost', 'Profit'];
  const product = createRandomProduct(createdAt);
  const type = types[randomNumberFrom1ToMax(2)];
  return {
    id: randomNumberFrom1ToMax(1000).toString(),
    name: `${type} Operation`,
    desc: `Some ${type.toLowerCase()} description`,
    photo: product.photo,
    category: product.category,
    createdAt: createdAt,
    amount: randomNumberFrom1ToMax(10),
    type: type,
  };
};
