using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CestaController : BaseApiController
    {
        private readonly StoreContext _context;
        public CestaController(StoreContext context)
        {
            _context = context;
            
        }
        [HttpGet(Name = "GetCesta")]
        public async Task<ActionResult<CestaDto>> GetCesta()
        {
            var cesta = await RecuperaCesta();

            if (cesta == null) return NotFound();
            return MapCestaToDto(cesta);
        }       
        [HttpPost]
        public async Task<ActionResult<CestaDto>> AddItemCesta(int produtoId, int quantidade)
        {
            var cesta = await RecuperaCesta();
            
            if(cesta == null) cesta = CriarCesta();        

            var produto = await _context.Produtos.FindAsync(produtoId);

            if(produto == null) return BadRequest(new ProblemDetails{Title = "Produto não encontrado!"});

            cesta.AddItem(produto, quantidade);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtAction("GetCesta", MapCestaToDto(cesta));

            return BadRequest(new ProblemDetails{Title="Problema ao salvar o item na cesta"});
        }
        [HttpDelete]
        public async Task<ActionResult> RemoveItemCesta(int produtoId, int quantidade)
        {
            //obtem cesta
            var cesta = await RecuperaCesta();
            if(cesta == null) return NotFound();

            //remove item ou reduz a quantidade
            cesta.RemoveItem(produtoId, quantidade);

            //salva as alterações
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problema ao remover item da cesta"});
        }        
        private async Task<Cesta> RecuperaCesta()
        {
            return await _context.Cestas
                        .Include(i => i.Itens)
                        .ThenInclude(p => p.Produto)
                        .FirstOrDefaultAsync(x => x.CompradorId == Request.Cookies["compradorId"]);
        }
        private Cesta CriarCesta()
        {
            var compradorId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30) 
            };
            Response.Cookies.Append("compradorId", compradorId, cookieOptions);
            var cesta = new Cesta{CompradorId = compradorId};

            _context.Cestas.Add(cesta);
            return cesta;
        }
        private CestaDto MapCestaToDto(Cesta cesta)
        {
            return new CestaDto
            {
                Id = cesta.Id,
                CompradorId = cesta.CompradorId,
                Items = cesta.Itens.Select(item => new ItemCestaDto
                {
                    ProdutoId = item.ProdutoId,
                    Nome = item.Produto.Name,
                    Preco = item.Produto.Price,
                    PictureUrl = item.Produto.PictureUrl,
                    Marca = item.Produto.Brand,
                    Tipo = item.Produto.Type,
                    Quantidade = item.Quantidade
                }).ToList()
            };
        }

    }
}