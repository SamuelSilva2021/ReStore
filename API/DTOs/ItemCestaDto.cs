namespace API.DTOs
{
    public class ItemCestaDto
    {
        public int ProdutoId { get; set; }
        public string Nome { get; set; }
        public long Preco { get; set; }
        public string PictureUrl { get; set; }
        public string Marca { get; set; }             
        public string Tipo { get; set; }
        public int Quantidade { get; set; }
    }
}