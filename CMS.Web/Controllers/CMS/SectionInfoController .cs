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
using System.Data;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/SectionInfo")]
    public class SectionInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public SectionInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }
        [Route("GetAll/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAllClass(int CompanyID)
        {
            try
            {
                //var result = Uow.SectionInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID);
                //return result;
                var result=  (from S in context.SectionInfoes
                 join C in context.Classes on S.ClassID equals C.ClassID
                 select new
                 {
                     C.ClassName,
                     S.ClassID,
                     S.SectionID,
                     S.SectionName,
                     S.CompanyID,
                     S.CreatedBy,
                     S.CreatedDate,
                     S.ModifyBy,
                     S.ModifyDate,
                     S.Status
                 }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                //Logger.LogInformation(ex.Message);
                throw ex;
            }
        }


        [Route("Add")]
        [HttpPost]
        public async Task<dynamic> Add([FromBody] SectionInfo entity)
        {
            try
            {
               

                var result = "";
                var search = context.SectionInfoes.FirstOrDefault(m => m.ClassID == entity.ClassID && m.SectionName==entity.SectionName );
                if (search == null)
                {
                    entity.CreatedDate = cstTime;
                    entity.ModifyDate = cstTime;
                    result = await Uow.SectionInfoRepository.Add(entity);
                }
                else
                {
                    return "Data Already Exits";
                }
                if (result.Trim() == "Data Saved Successfully")
                {
                    //await Uow.TblLogHistoryRepository.AddLogHistory(entity.Applicant.ToString() + " has been added successfully.", 20029, 1, 1, entity.AppID);
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
        public async Task<dynamic> Update([FromBody] SectionInfo entity)
        {
            try
            {
                entity.ModifyBy = entity.ModifyBy;
                entity.ModifyDate = cstTime;
                var result = await Uow.SectionInfoRepository.Update(entity);
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
