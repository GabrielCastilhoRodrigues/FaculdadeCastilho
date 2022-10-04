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
    public class ProfessorController : ControllerBase
    {
        private readonly Context _context;

        public ProfessorController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Professor>>> RetornaProfessores()
        {
            return await _context.Professor.ToListAsync();
        }

        [HttpGet("{numRegistro}")]
        public async Task<ActionResult<Professor>> BuscaProfessor(int numRegistro)
        {
            Professor professor = await _context.Professor.FindAsync(numRegistro);

            if (professor == null)
            {
                return NotFound();
            }

            return professor;
        }

        [HttpPost]
        public async Task<ActionResult<Professor>> CadastraProfessor(Professor professor)
        {
            await _context.Professor.AddAsync(professor);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizaProfessor(Professor professor)
        {
            _context.Professor.Update(professor);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> ExcluiProfessor(int numRegistro)
        {
            Professor professor = await _context.Professor.FindAsync(numRegistro);

            if (professor == null)
            {
                return NotFound();
            }
            _context.Remove(professor);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}