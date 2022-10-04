using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Disciplina
    {
        [Key]
        public int idDisciplina {get; set;}
        public int idCurso {get; set;}
        public int numRegistro {get; set;}
        public string nome {get; set;}
    }
}