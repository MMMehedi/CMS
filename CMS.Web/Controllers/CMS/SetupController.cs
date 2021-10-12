using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using CMS.Repository;
using CMS.Repository.UnitOfWorks;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/SetUpInfo")]
    public class SetUpInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public SetUpInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        [Route("GetAllClass/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllClass(int CompanyID)
        {
            try
            {
                var result = Uow.ClassInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllShift/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllShift(int CompanyID)
        {
            try
            {
                var result = context.Shifts.Where(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllGroup/{ClassID:int}")]
        [HttpGet]
        public dynamic GetAllGroup(int ClassID)
        { 
            try
            {
                var result = context.Groups.Where(m => m.ClassID == ClassID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllSection/{ClassID:int}")]
        [HttpGet]
        public dynamic GetAllSection(int ClassID)
        {
            try
            {
                var result = context.SectionInfoes.Where(m => m.ClassID == ClassID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllReligion/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllReligion(int CompanyID)
        {
            try
            {
                var result = context.Religions.Where(m => m.CompanyId == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllGender/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllGender(int CompanyID)
        {
            try
            {
                var result = context.Genders.Where(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

        [Route("GetAllBlood")]
        [HttpGet]
        public dynamic GetAllBlood()
        {
            try
            {
                var result = context.Bloods;
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }

       
        [Route("ProfessionType/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetMotherProfessionType(int CompanyID)
        {
            try
            {
                var result = context.ProfessionTypes.Where(m => m.CompanyID == CompanyID);
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }
        //[Route("Add")]
        //[HttpPost]
        //public async Task<dynamic> Add([FromBody] DesignationInfo entity)
        //{
        //    try
        //    {
        //        var result = "";
        //        var search = context.DesignationInfoes.FirstOrDefault(m => m.DesigName == entity.DesigName);
        //        if (search == null)
        //        {
        //            entity.CreatedDate = cstTime;
        //            entity.ModifyDate = cstTime;
        //            result = await Uow.DesignationInfoRepository.Add(entity);
        //        }
        //        else
        //        {
        //            return "Data Already Exits";
        //        }
        //        if (result.Trim() == "Data Saved Successfully")
        //        {
        //            //await Uow.TblLogHistoryRepository.AddLogHistory(entity.Applicant.ToString() + " has been added successfully.", 20029, 1, 1, entity.AppID);
        //        }
        //        return Json(result);
        //        //entity.CreatedDate = cstTime;
        //        //entity.ModifyDate = cstTime;
        //        //entity.Active = true;
        //        //var result = await Uow.DesignationInfoRepository.Add(entity);
        //        //return Json(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        //Logger.LogInformation(ex.Message);
        //        throw ex;
        //    }
        //}

        //[Route("Update")]
        //[HttpPost]
        //public async Task<dynamic> Update([FromBody] DesignationInfo entity)
        //{
        //    try
        //    {
        //        entity.ModifyBy = entity.ModifyBy;
        //        entity.ModifyDate = cstTime;
        //        var result = await Uow.DesignationInfoRepository.Update(entity);
        //        return Json(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        //Logger.LogInformation(ex.Message);
        //        throw ex;
        //    }
        //}
    }
}
