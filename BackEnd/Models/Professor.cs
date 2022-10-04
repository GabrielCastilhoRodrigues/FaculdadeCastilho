using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Professor
    {
        [Key]
        public int numRegistro {get; set;}
        public string nome {get; set;}
        public DateTime dataNascimento {get; set;}
        public decimal salario {get; set;}
    }
}