using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using CMS.Repository;
using CMS.Repository.UnitOfWorks;
using CMS.Web.Controllers;

namespace CMS.Web.ApiDataProcessor.Common
{
    public class CommonDp : BaseController, ICommonDp
    {
        public CommonDp(IUnitOfWork uow)
        {
            Uow = uow;
        }
        public async Task<dynamic> Login(UserInfo entity)
        {
            try
            {
                var objUser = await Uow.TblUserRepositroy.Login(entity.Email, entity.Password);
                if (objUser != null)
                {
                    var session = HttpContext.Current.Session;
                    session["UserID"] = objUser.UserID;
                    session["Name"] = objUser.Name;
                    session["Email"] = objUser.Email;
                    session["Password"] = objUser.Password;
                    return objUser;
                }
                return null;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}