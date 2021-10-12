using System.Threading.Tasks;
using CMS.Repository;

namespace CMS.Web.ApiDataProcessor.Common
{
    public interface ICommonDp
    {
        Task<dynamic> Login(UserInfo entity);
    }
}