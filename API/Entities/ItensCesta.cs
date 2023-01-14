using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("ItensCesta")]
    public class ItensCesta
    {
        public int Id { get; set; }
        public int Quantidade { get; set; }
        
        //navigation propriedades
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }

        public int CestaId { get; set; }
        public Cesta Cesta { get; set; }
    }
}