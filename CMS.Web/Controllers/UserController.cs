using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using CMS.Repository;
using CMS.Web.ApiDataProcessor.Common;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : BaseController
    {
        public UserController(CommonDp cDp)
        {
            CDp = cDp;
        }

        //POST api/User/Login
        [Route("Login")]
        [HttpPost]
        public async Task<dynamic> Login([FromBody] UserInfo entity)
        {
            try
            {
                CMSEntities context = new CMSEntities();
                var result = await Task.FromResult(context.UserInfoes.SingleOrDefault(u => (u.Email == entity.Email || u.Mobile == entity.Email) && u.Password == entity.Password));
                if (result == null)
                {
                    return result;
                }
                else
                {
                    var q = await CDp.Login(entity);
                    return q;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [Route("session/{id:long}")]
        [HttpGet]
        public dynamic Logout(int id)
        {
            try
            {
                var session = HttpContext.Current.Session;
                session["UserID"] = null;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
            return 0;
        }

    }
}