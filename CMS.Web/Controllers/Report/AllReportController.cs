using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Globalization;
using System.Web.Mvc;
using CMS.Repository.UnitOfWorks;

namespace VC.Web.Controllers.Report
{
    public class AllReportController : Controller
    {
        private IUnitOfWork Uow { get; set; }
        public AllReportController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        #region ApplicationReport
        public ActionResult ApplicationReport()
        {
            //string strurl = Request.Url.AbsoluteUri.ToString();
            //var AppID = Convert.ToInt32(strurl.Substring(strurl.LastIndexOf("/") + 1));
            //ReportDocument rdoc = new ReportDocument();
            //rdoc.Load(Server.MapPath("~/Report/rptApplicationInfo.rpt"));
            //dynamic query = Uow.TblUserRepositroy.GetApplicationByAppID(AppID);
            //rdoc.SetDataSource(query);
            //System.IO.Stream oStream = null;
            //byte[] byteArray = null;
            //oStream = rdoc.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            //byteArray = new byte[oStream.Length];
            //oStream.Read(byteArray, 0, Convert.ToInt32(oStream.Length - 1));
            //Response.ClearContent();
            //Response.ClearHeaders();
            //Response.ContentType = "application/pdf";
            //Response.BinaryWrite(byteArray);
            //Response.Flush();
            //rdoc.Close();
            //rdoc.Dispose();
            return View();
        }
        #endregion ApplicationReport
        



    }
}




