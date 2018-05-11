using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using TestWeb.Models;

namespace TestWeb.Controllers
{
    public class ShowController : Controller
    {
        #region static data
        static List<ViewModel> list = new List<ViewModel>
                {
                    new ViewModel { Id  = 1, PlantName = "PlantName1", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 2, PlantName = "PlantName2", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 3, PlantName = "PlantName3", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 4, PlantName = "PlantName4", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 5, PlantName = "PlantName5", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 6, PlantName = "PlantName6", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 7, PlantName = "PlantName7", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 8, PlantName = "PlantName8", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 9, PlantName = "PlantName9", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 10, PlantName = "PlantName10", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"},
                    new ViewModel { Id  = 11, PlantName = "PlantName11", AssemblerNameCh = "AssemblerNameCh",AssemblerNameEn ="AssemblerNameEn", WorkshopName = "WorkshopName", SaleName = "SaleName"}
                };


        #endregion

        public ActionResult Login()
        {
            return View();
        }
        public ActionResult List()
        {
            return View();
        }
        public ActionResult Detail()
        {
            return View();
        }
        public ActionResult Edit()
        {
            return View();
        }
        public ActionResult AllInForm()
        {
            return View();
        }
        [HttpGet]
        [Description("根据条件查询列表数据")]
        public ActionResult GetList(string userId, int currentPage = 1)
        {
            int PageSize = 10;
            //int StartRow = (currentPage - 1) * PageSize + 1;
            //int EndRow = currentPage * PageSize;
            List<ViewModel> dataList = list.Skip((currentPage - 1) * PageSize).Take(PageSize).ToList();

            //总数
            var count = dataList.Count + 1;
            //总页数
            var total = (count + PageSize - 1) / PageSize;
            return Json(new
            {
                rows = dataList,
                total = total,
                totalCount = count
            }, JsonRequestBehavior.AllowGet);
        }
        #region 导出下载报告
        [Description("报告导出")]
        public ActionResult ExportWorkShopReport()
        {

            try
            {
                DataTable dt = ToDataTable(list);


                string path = Server.MapPath("~/Files");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string tempFile = Guid.NewGuid() + ".xlsx";
                string filePath = Path.Combine(path, tempFile);

                ExcelManage.TableToExcel(dt, filePath);
                return Json(new { ExcelUrl = filePath, Name = "VSS_WorkShopReport_" + System.DateTime.Now.ToString("yyyy-MM-dd") + ".xlsx", stat = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(new { Name = "VSS_WorkShopReport_" + System.DateTime.Now.ToString("yyyy-MM-dd") + ".xlsx", stat = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public FileResult DowloadExcel(string Url, string filename)
        {
            return File(Url, "application/octet-stream", filename);
        }
        #endregion
        #region Extend
        public static DataTable ToDataTable<T>(List<T> collection)
        {
            var props = typeof(T).GetProperties();
            var dt = new DataTable();
            dt.Columns.AddRange(props.Select(p => new DataColumn(p.Name, p.PropertyType)).ToArray());
            if (collection.Count() > 0)
            {
                for (int i = 0; i < collection.Count(); i++)
                {
                    ArrayList tempList = new ArrayList();
                    foreach (PropertyInfo pi in props)
                    {
                        object obj = pi.GetValue(collection.ElementAt(i), null);
                        tempList.Add(obj);
                    }
                    object[] array = tempList.ToArray();
                    dt.LoadDataRow(array, true);
                }
            }
            return dt;
        }


        #endregion

    }
}