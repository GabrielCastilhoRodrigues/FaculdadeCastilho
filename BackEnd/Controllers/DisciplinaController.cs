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
    public class DisciplinaController : ControllerBase
    {
        private readonly Context _context;

        public DisciplinaController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Disciplina>>> RetornaDisciplinas()
        {
            return await _context.Disciplina.ToListAsync();
        }

        [HttpGet("{idDisciplina}")]
        public async Task<ActionResult<Disciplina>> BuscaDisciplina(int idDisciplina)
        {
            Disciplina disciplina = await _context.Disciplina.FindAsync(idDisciplina);

            if (disciplina == null)
            {
                return NotFound();
            }

            return disciplina;
        }

        [HttpPost]
        public async Task<ActionResult<Disciplina>> CadastraDisciplina(Disciplina disciplina)
        {
            await _context.Disciplina.AddAsync(disciplina);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizaDisciplina(Disciplina disciplina)
        {
            _context.Disciplina.Update(disciplina);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> ExcluiDisciplina(int idDisciplina)
        {
            Disciplina disciplina = await _context.Disciplina.FindAsync(idDisciplina);

            if (disciplina == null)
            {
                return NotFound();
            }
            _context.Remove(disciplina);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}