export default class Item {
    private product: string;
    private price: number;
    private necessity: number;

    constructor (product: string, price: number, necessity: number) {
        this.product = product;
        this.price = price;
        this.necessity = necessity;
    }
    
    getProduct() {
        return this.product;
    }
    
    getPrice() {
        return this.price;
    }
    
    getNecessity() {
        return this.necessity;
    }
}
