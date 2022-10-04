using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Curso
    {
        [Key]
        public int idCurso {get; set;}
        public string nome {get; set;}
    }
}