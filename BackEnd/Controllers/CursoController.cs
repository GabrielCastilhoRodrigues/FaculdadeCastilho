using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDFaculdade.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CursoController : ControllerBase
    {
        private readonly Context _context;

        public CursoController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Curso>>> RetornaCursos()
        {
            return await _context.Curso.ToListAsync();
        }

        [HttpGet("{idCurso}")]
        public async Task<ActionResult<Curso>> BuscaCurso(int idCurso)
        {
            Curso curso = await _context.Curso.FindAsync(idCurso);

            if (curso == null)
            {
                return NotFound();
            }

            return curso;
        }

        [HttpPost]
        public async Task<ActionResult<Curso>> CadastraCurso(Curso curso)
        {
            await _context.Curso.AddAsync(curso);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizaCurso(Curso curso)
        {
            _context.Curso.Update(curso);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> ExcluiCurso(int idCurso)
        {
            Curso curso = await _context.Curso.FindAsync(idCurso);

            if (curso == null)
            {
                return NotFound();
            }
            _context.Remove(curso);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}