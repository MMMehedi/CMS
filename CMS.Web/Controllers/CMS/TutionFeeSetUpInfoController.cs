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
    [RoutePrefix("api/TutionFeeSetUpInfo")]
    public class TutionFeeSetUpInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public TutionFeeSetUpInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }
        [Route("GetAll/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAll(int CompanyID)
        {
            try
            {
                var result = (from T in context.TutionFeeSetUps
                              join C in context.Classes on T.ClassID equals C.ClassID
                              join G in context.Groups on T.GroupID equals G.GroupID
                              join ST in context.StudentTypes on T.StudentTypeID equals ST.StudentTypeID
                              //join S in context.Subjects on T.SubjectID equals S.SubjectID
                              //join SS in context.Shifts on SE.ShiftID equals SS.ShiftID
                              select new
                              {
                                  T.TutionFeeID,
                                  T.ClassID,
                                  C.ClassName,
                                  T.GroupID,
                                  G.GroupName,
                                  T.StudentTypeID,
                                  ST.StudentTypeName,
                                  T.TutionFee,
                                  T.CompanyID,
                                  T.CreatedBy,
                                  T.CreatedDate,
                                  T.Status,
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
        public async Task<dynamic> Add([FromBody] TutionFeeSetUp entity)
        {
            try
            {
                var result = "";
                var search = context.TutionFeeSetUps.FirstOrDefault(m => m.ClassID == entity.ClassID && m.GroupID==entity.GroupID);
                if (search == null)
                {
                    entity.CreatedDate = cstTime;
                    entity.ModifyDate = cstTime;
                    result = await Uow.TblTutionFeeSetUpInfoRepository.Add(entity);
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
        public async Task<dynamic> Update([FromBody] TutionFeeSetUp entity)
        {
            try
            {
                entity.ModifyBy = entity.ModifyBy;
                entity.ModifyDate = cstTime;
                var result = await Uow.TblTutionFeeSetUpInfoRepository.Update(entity);
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
