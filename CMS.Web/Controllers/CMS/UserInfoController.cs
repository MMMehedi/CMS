using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using CMS.Repository;
using CMS.Repository.UnitOfWorks;
using CMS.Web.Controllers;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/UserInfo")]
    public class UserInfoController : BaseController
    {
        public UserInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }
        CMSEntities db = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");

        [Route("GetAll/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAll(int CompanyID)
        {
            try
            {
                var result = Uow.UserInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID).OrderByDescending(a => a.UserID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetEmpByComID/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetEmpByComID(int CompanyID)
        {
            try
            {
                var result = Uow.EmployeeInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }


        [Route("GetByEmpID/{CompanyID:int}/{EmpID:int}")]
        [HttpGet]
        public dynamic GetByEmpID(int CompanyID, int EmpID)
        {
            try
            {
                var result = Uow.EmployeeInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID && m.EmpID == EmpID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetByUserID/{UserID:long}")]
        [HttpGet]
        public async Task<dynamic> GetByUserID(long UserID)
        {
            try
            {
                return await Uow.UserInfoRepository.FirstOrDefault(m => m.UserID == UserID);
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("Add")]
        [HttpPost]
        public async Task<dynamic> Add([FromBody] UserInfo entity)
        {
            try
            {
                var result = "";
                var search = db.UserInfoes.FirstOrDefault(m => m.Mobile == entity.Mobile || m.Email == entity.Email);
                if (search == null)
                {
                    entity.CreateDate = cstTime;
                    entity.ModifyDate = cstTime;
                    result = await Uow.UserInfoRepository.Add(entity);
                }
                else
                {
                    return "Data Already Exits";
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
        public async Task<dynamic> Update([FromBody] UserInfo entity)
        {
            try
            {
                entity.ModifyDate = cstTime;
                var result = await Uow.UserInfoRepository.Update(entity);
                return Json(result);
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

    }
}
