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
    public class AlunoController : ControllerBase
    {
        private readonly Context _context;

        public AlunoController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aluno>>> RetornaAlunos()
        {
            return await _context.Aluno.ToListAsync();
        }

        [HttpGet("{numMatricula}")]
        public async Task<ActionResult<Aluno>> BuscaAluno(int numMatricula)
        {
            Aluno aluno = await _context.Aluno.FindAsync(numMatricula);

            if (aluno == null)
            {
                return NotFound();
            }

            return aluno;
        }

        [HttpPost]
        public async Task<ActionResult<Aluno>> CadastraAluno(Aluno aluno)
        {
            await _context.Aluno.AddAsync(aluno);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizaAluno(Aluno aluno)
        {
            _context.Aluno.Update(aluno);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> ExcluiAluno(int numMatricula)
        {
            Aluno aluno = await _context.Aluno.FindAsync(numMatricula);

            if (aluno == null)
            {
                return NotFound();
            }
            _context.Remove(aluno);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}