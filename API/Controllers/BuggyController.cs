using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound(new ProblemDetails{Title = "Não encontrado"});
        }
        [HttpGet("bad-request")]
        public ActionResult GetNotBadRequest()
        {
            return BadRequest(new ProblemDetails {Title = "Erro na requisição"} );
        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            //Caso haja erro na autenticação
            return Unauthorized(new ProblemDetails{Title = "Não autorizado"});
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            //Caso haja erro de validação
            ModelState.AddModelError("Problema1", "Esse é o primeiro erro");
            ModelState.AddModelError("Problema1", "Esse é o segundo erro");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Erro no servidor");
        }
    }
}