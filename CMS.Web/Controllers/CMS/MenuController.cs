using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using CMS.Repository;
using CMS.Repository.UnitOfWorks;
using CMS.Web.Controllers;
using System.Linq;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/Menu")]
    public class MenuController : BaseController
    {
        public MenuController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        CMSEntities db = new CMSEntities();

        //GET: /api/Menu/GetRootMenu
        [Route("GetRootMenu")]
        [HttpGet]
        public dynamic GetRootMenu()
        {
            try
            {
                var q = Uow.TblMenuRepositroy.GetRootMenu();
                return q;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        //GET: /api/Menu/GetChildMenuByEmailUserID
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpGet]
        [Route("GetChildMenuByParentIDUserID/{ParentID}/{UserID:int}")]
        public dynamic GetChildMenuByParentIDUserID(string ParentID, int UserID)
        {
            var result = Uow.TblMenuRepositroy.GetChildMenuByParentIDUserID(ParentID, UserID);
            return result;
        }


        [Route("Add")]
        [HttpPost]
        public async Task<dynamic> Add([FromBody] IEnumerable<Permission> entity)
        {
            try
            {
                var result = "";
                foreach (var item in entity)
                {
                    var search = db.Permissions.FirstOrDefault(m => m.UserID == item.UserID && m.MenuCode == item.MenuCode);
                    if (search != null)
                    {
                        item.PerID = search.PerID;
                        item.MenuCode = search.MenuCode;
                        result = await Uow.PermissionRepository.Update(item);
                    }
                    else
                    {
                        result = await Uow.PermissionRepository.Add(item);
                    }
                }
                return Json(result);
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("Update")]
        [HttpPost]
        public async Task<dynamic> Update([FromBody] IEnumerable<Permission> entity)
        {
            try
            {
                foreach (var list in entity)
                {
                    var RootMenuCode = list.MenuCode.ToString().Substring(0, 1);
                    var result = db.Permissions.FirstOrDefault(m => m.UserID == list.UserID && m.MenuCode == RootMenuCode);
                    if (result != null)
                    {
                        list.PerID = result.PerID;
                        list.MenuCode = result.MenuCode;
                        list.UserPer = list.chkRootMenu;
                        await Uow.PermissionRepository.Update(list);
                    }
                    break;
                }
                return 0;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }



    }
}
