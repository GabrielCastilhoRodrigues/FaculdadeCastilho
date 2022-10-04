using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.Models
{
    public class Nota
    {
        [Key]
        public int idNota {get; set;}
        public int idDisciplina {get; set;}
        public int numMatricula {get; set;}
        public decimal nota {get; set;}
    }
}