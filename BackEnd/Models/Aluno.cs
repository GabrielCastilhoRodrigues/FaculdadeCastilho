using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Aluno
    {
        [Key]
        public int numMatricula {get; set;}
        public string nome {get; set;}
        public DateTime dataNascimento {get; set;}
    }
}