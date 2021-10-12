using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class ReportController : Controller
    {
        public ActionResult Info()
        {
            return View();
        }
        public PartialViewResult _AllReport()
        {
            return PartialView();
        }
        //public PartialViewResult _SuitReport()
        //{
        //    return PartialView();
        //}




        //public PartialViewResult _Dashboard(int? id)
        //{            
        //    return PartialView();
        //}

        //public PartialViewResult _User()
        //{
        //    return PartialView();
        //}

        //public PartialViewResult _Welcome(int? id)
        //{
        //    return PartialView();
        //}

    }
}