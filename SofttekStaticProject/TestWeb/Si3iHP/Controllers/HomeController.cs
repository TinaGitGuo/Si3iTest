using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Si3iHP.Models;

namespace Si3iHP.Controllers
{
    public class HomeController : Controller
    {
        Si3IHpContext db = new Si3IHpContext();
        public ActionResult Index()
        {
            if (db.Database.Exists())
            {
                db.Database.Delete();
            }
            db.Database.Create();
            //db.Database.Initialize(true);
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}