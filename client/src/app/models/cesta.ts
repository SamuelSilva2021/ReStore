export interface ItemCesta {
    produtoId: number;
    nome: string;
    preco: number;
    pictureUrl: string;
    marca: string;
    tipo: string;
    quantidade: number;
}

export interface Cesta {
    id: number;
    compradorId: string;
    items: ItemCesta[];
}