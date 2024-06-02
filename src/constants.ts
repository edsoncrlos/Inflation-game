import Item from "./Item";

export const MAX_MONEY = 75;

export const shelf: Item[] = new Array<Item>;

shelf.push(new Item('Arroz (5kg)', 22, 10));
shelf.push(new Item('Açúcar (2kg)', 3, 5));
shelf.push(new Item('Óleo (1l)', 8, 6));
shelf.push(new Item('Feijão (1kg)', 5, 10));
shelf.push(new Item('Macarrão (500g)', 5, 8));
shelf.push(new Item('Sardinha (1lata)', 5, 7));
shelf.push(new Item('Carne (1kg)', 32, 9));
shelf.push(new Item('Frango (1kg)', 13, 9));
shelf.push(new Item('Queijo (200g)', 8, 5));
shelf.push(new Item('Presunto (200g)', 4, 5));
shelf.push(new Item('Pão (8un.)', 6, 6));
shelf.push(new Item('Banana (1kg)', 4, 7));
shelf.push(new Item('Laranja (1kg)', 2, 7));
shelf.push(new Item('Abacate (1kg)', 7, 2));
shelf.push(new Item('Sabão (1un.)', 2, 9));
shelf.push(new Item('Limpador multiuso (1un.)', 4, 6));
shelf.push(new Item('Água Tônica (500ml)', 7, 1));
shelf.push(new Item('Polpa de Fruta (500ml)', 6, 4));
shelf.push(new Item('Refrigerante (2l)', 8, 3));
shelf.push(new Item('Cerveja (600ml)', 6, 2));

export const MAX_ITENS = shelf.length;
