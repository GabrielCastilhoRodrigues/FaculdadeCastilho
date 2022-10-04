using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotaController: ControllerBase
    {
        private readonly Context _context;

        public NotaController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Nota>>> RetornaNotas()
        {
            return await _context.Nota.ToListAsync();
        }

        [HttpGet("{idNota}")]
        public async Task<ActionResult<Nota>> BuscaNota(int idNota)
        {
            Nota nota = await _context.Nota.FindAsync(idNota);

            if (nota == null)
            {
                return NotFound();
            }

            return nota;
        }

        [HttpPost]
        public async Task<ActionResult<Nota>> CadastraNota(Nota nota)
        {
            await _context.Nota.AddAsync(nota);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizaNota(Nota nota)
        {
            _context.Nota.Update(nota);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> ExcluiNota(int idNota)
        {
            Nota nota = await _context.Nota.FindAsync(idNota);

            if (nota == null)
            {
                return NotFound();
            }
            _context.Remove(nota);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}