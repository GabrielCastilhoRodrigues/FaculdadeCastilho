using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Models
{
    public class Context : DbContext
    {
        public DbSet<Curso> Curso {get; set;}
        public DbSet<Professor> Professor {get; set;}
        public DbSet<Disciplina> Disciplina {get; set;}
        public DbSet<Aluno> Aluno {get; set;}
        public DbSet<Nota> Nota {get; set;}

        public Context(DbContextOptions<Context> opcoes): base(opcoes) 
        {
            
        }
    }
}