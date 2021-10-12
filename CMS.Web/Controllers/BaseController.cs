using System.Web.Http;
using CMS.Repository.UnitOfWorks;
using CMS.Web.ApiDataProcessor.Common;

namespace CMS.Web.Controllers
{
    public class BaseController : ApiController
    {
        protected IUnitOfWork Uow { get; set; }
        protected ICommonDp CDp { get; set; }

    }
}