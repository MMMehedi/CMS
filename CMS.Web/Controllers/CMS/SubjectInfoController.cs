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
    [RoutePrefix("api/SubjectInfo")]
    public class SubjectInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public SubjectInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }
        [Route("GetAll/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAll(int CompanyID)
        {
            try
            {
                var result = context.Subjects;
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
        public async Task<dynamic> Add([FromBody] Subject entity)
        {
            try
            {
                var result = "";
                var search = context.Subjects.FirstOrDefault(m => m.SubjectCode == entity.SubjectCode && m.SubjectName==entity.SubjectName);
                if (search == null)
                {
                    entity.CreatedDate = cstTime;
                    entity.ModifyDate = cstTime;
                    result = await Uow.TblSubjectInfoRepository.Add(entity);
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
        public async Task<dynamic> Update([FromBody] Subject entity)
        {
            try
            {
                entity.ModifyBy = entity.ModifyBy;
                entity.ModifyDate = cstTime;
                var result = await Uow.TblSubjectInfoRepository.Update(entity);
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
