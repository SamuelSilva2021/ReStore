using System.Collections.Generic;
using API.DTOs;

namespace API.Controllers
{
    public class CestaDto
    {
        public int Id { get; set; }
        public string CompradorId { get; set; }
        public List<ItemCestaDto> Items { get; set; }
    }
}