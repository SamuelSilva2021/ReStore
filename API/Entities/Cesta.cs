using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cesta
    {
        public int Id { get; set; }
        public string CompradorId { get; set; }
        public List<ItensCesta> Itens { get; set; } = new();

        //Adicionar itens ao carrinho de compras
        public void AddItem(Produto produto, int quantidade){
            if(Itens.All(item => item.ProdutoId != produto.Id)){
                Itens.Add(new ItensCesta
                {
                    Produto = produto, 
                    Quantidade = quantidade
                });
            }
            var existeItem = Itens.FirstOrDefault(item => item.ProdutoId == produto.Id);
            if(existeItem != null) existeItem.Quantidade += quantidade;
        }
        //Remover item do carrinho de compras
        public void RemoveItem(int produtoId, int quantidade){
            var item = Itens.FirstOrDefault(item => item.ProdutoId == produtoId);
            if(item == null) return;
            
            item.Quantidade -= quantidade;

            if(item.Quantidade == 0) Itens.Remove(item);
        }
    }
}