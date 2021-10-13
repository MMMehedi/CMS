using System;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.Repository;
using CMS.Repository.UnitOfWorks;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Web.Controllers
{
    public class CMSController : Controller
    {
        protected IUnitOfWork Uow;
        public CMSController(IUnitOfWork uow)
        {
            this.Uow = uow;
        }
        protected override void Initialize(RequestContext requestContext)
        {
            try
            {
                CMSEntities CMS = new CMSEntities();
                base.Initialize(requestContext);
                if (Session["UserID"] != null)
                {
                    int UserID = Convert.ToInt32(Session["UserID"]);
                    var password = Session["Password"].ToString();
                    //IEnumerable<User> listtblUser = Uow.UsersRepository.FindBy(p => p.UserCode == userCode && p.Password == password);
                    //if (listtblUser.Count() == 0)
                    //{
                    //    Response.ExpiresAbsolute = DateTime.Now;
                    //    Response.Expires = 0;
                    //    Response.CacheControl = "no-cache";
                    //    Session.Abandon();
                    //    RedirectToAction("Index", "Account");
                    //}
                    string controller = requestContext.RouteData.Values.ToList()[0].Value.ToString();
                    string method = requestContext.RouteData.Values.ToList()[1].Value.ToString();
                    string url = "";
                    if (method == "Info")
                    {
                        url = "/" + controller + "/" + method;
                        var usermenu = (from M in CMS.Menus
                                        join P in CMS.Permissions on M.MenuCode equals P.MenuCode
                                        where P.UserPer == true && P.UserID == UserID && M.IsActive == 1
                                        select new { M.MenuCode }).ToList();

                        if (usermenu.Count() == 0)
                        {
                            Response.ExpiresAbsolute = DateTime.Now;
                            Response.Expires = 0;
                            Response.CacheControl = "no-cache";
                            Session.Abandon();
                            Session["UserID"] = null;
                            RedirectToAction("../Home/Index");
                        }
                        else
                        {
                            ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                            View();
                        }
                    }
                    else
                    {
                        var result = method.Split('_');
                        var page = result.ToList()[1].ToString();
                        url = "/" + controller + "/" + "Info#" + "/" + page;
                        //var menu = Uow.MenuRepository.FindBy(m => m.URL == url && m.IsActive == 1).FirstOrDefault();
                        var menu = (from M in CMS.Menus
                                    join P in CMS.Permissions on M.MenuCode equals P.MenuCode
                                    where M.URL == url && P.UserPer == true && P.UserID == UserID && M.IsActive == 1
                                    select new { M.MenuCode }).ToList();

                        if (menu.Count() == 0)
                        {
                            Response.ExpiresAbsolute = DateTime.Now;
                            Response.Expires = 0;
                            Response.CacheControl = "no-cache";
                            Session.Abandon();
                            Session["UserID"] = null;
                            RedirectToAction("../Home/Index/");
                        }
                        else
                        {
                            ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                            View();

                            //var menuCode = menu.FirstOrDefault().MenuCode; 
                            //var permission = Uow.PermissionRepository.FindBy(m => m.MenuCode == menuCode && m.UserID == userCode).FirstOrDefault();
                            //if (menu == null)
                            //{
                            //    RedirectToAction("Index", "Account");
                            //}
                        }
                    }
                }
            }
            catch (Exception)
            {
                Session["UserID"] = null;
                RedirectToAction("../Home/Index");
            }
        }

        public ActionResult Info()
        {
            var session = HttpContext.Session;
            int UserID = Convert.ToInt32(session["UserID"]);
            if (UserID != 0)
            {
                ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                return View();
            }
            else
                return RedirectToAction("../Home/Index");
        }

        public ActionResult _UserInfo()
        {
            var session = HttpContext.Session;
            int UserID = Convert.ToInt32(session["UserID"]);
            if (UserID != 0)
            {
                ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                return PartialView();
            }
            else
                return RedirectToAction("../Home/Index/");
        }
        public ActionResult _SectionInfo()
        {
            var session = HttpContext.Session;
            int UserID = Convert.ToInt32(session["UserID"]);
            if (UserID != 0)
            {
                ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                return PartialView();
            }
            else
                return RedirectToAction("../Home/Index/");
        }
        public ActionResult _StudentInfo()
        {
            var session = HttpContext.Session;
            int UserID = Convert.ToInt32(session["UserID"]);
            if (UserID != 0)
            {
                ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                return PartialView();
            }
            else
                return RedirectToAction("../Home/Index/");
        }


        public ActionResult _UserPermission()
        {
            //return PartialView();
            var session = HttpContext.Session;
            int UserID = Convert.ToInt32(session["UserID"]);
            if (UserID != 0)
            {
                ViewBag.Menu = Uow.TblMenuRepositroy.ParentMenuList(UserID);
                return PartialView();
            }
            else
                return RedirectToAction("../Home/Index/");
        }

        //[Route("GetWebsiteImage")]
        //[HttpPost]
        public async Task<dynamic> GetWebsiteImage(int StudentID)
        {
            try
            {
                StudentInformation objEmployee = await Uow.TblStudentInformationRepository.GetByID(StudentID);
                return File(objEmployee.Picture, "-", "");

            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

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