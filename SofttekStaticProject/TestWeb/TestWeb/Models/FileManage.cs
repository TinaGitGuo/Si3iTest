using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;



    /// <summary>
    /// 返回结果
    /// </summary>
    public class ResultMessage
    {
        /// <summary>
        /// 图片相对路径
        /// </summary>
        public string url { get; set; }
        /// <summary>
        /// 服务器实际路径
        /// </summary>
        public string realPath { get; set; }
    }
    /// <summary>
    /// 文件保存
    /// </summary>
    public static class FileManage
    {
        /// <summary>
        /// 保存图片
        /// </summary>
        /// <param name="File"></param>
        /// <param name="savePathe"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static ResultMessage SaveFile(HttpPostedFileBase file, string savePathe, int id)
        {
            ResultMessage result = new ResultMessage();
            if (file != null)
            {
                string path = HttpContext.Current.Server.MapPath(savePathe + id);
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string s = file.FileName;
                //string str = s.Substring(s.LastIndexOf("."));
                //string tempFile = Guid.NewGuid() + str;
                //string filePath = Path.Combine(path, tempFile);
                string filePath = Path.Combine(path, s);

                file.SaveAs(filePath);
                //result.url = savePathe.Replace('~',' ').Trim() + id + "/" + tempFile;
                result.url = savePathe.Replace('~', ' ').Trim() + id + "/" + s;

                result.realPath = filePath;
            }
            return result;
        }
        /// <summary>
        /// 删除上传的附件
        /// </summary>
        /// <param name="file"></param>
        public static void Delete(ResultMessage file)
        {
            if (!string.IsNullOrEmpty(file.realPath))
            {
                if (System.IO.File.Exists(file.realPath))
                {
                    System.IO.File.Delete(file.realPath);
                }
            }
        }
    }
