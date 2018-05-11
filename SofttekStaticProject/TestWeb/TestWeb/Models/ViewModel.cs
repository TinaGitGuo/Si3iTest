using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestWeb.Models
{
    public class ViewModel
    {
        public int Id { get; set; }
     
       
        public string PlantName { get; set; }
        /// <summary>
        /// 所属集团ChName
        /// </summary>
        public string AssemblerNameCh { get; set; }
        /// <summary>
        /// 所属集团EnName
        /// </summary>
        public string AssemblerNameEn { get; set; }
        public string WorkshopName { get; set; }
        public string SaleName { get; set; }
 

    }
}