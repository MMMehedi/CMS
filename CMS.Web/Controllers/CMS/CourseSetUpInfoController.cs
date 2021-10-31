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
    [RoutePrefix("api/CourseSetUpInfo")]
    public class CourseSetUpInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public CourseSetUpInfoController(IUnitOfWork uow)
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
        public async Task<dynamic> Add([FromBody] CourseSetup entity)
        {
            try
            {
                var result = "";
                var search = context.CourseSetups.FirstOrDefault(m => m.ClassID == entity.ClassID && m.GroupID == entity.GroupID && m.SubjectID==entity.SubjectID);
                if (search == null)
                {
                    var CourseID = 0;
                    var ID = (from C in context.CourseSetups
                              select new { C.CourseID }).ToList();
                    if (ID.Count() > 0)
                    {
                        CourseID = Convert.ToInt32(ID.Select(C => C.CourseID).Max() + 1);
                    }
                    else
                    {
                        CourseID += 1;
                    }


                    foreach (var item in entity.CourseDetail)
                    {
                        CourseSetup CS = new CourseSetup();
                        CS.CourseID = CourseID;
                        CS.CourseName = entity.CourseName;
                        CS.CourseDurationID = entity.CourseDurationID;
                        CS.ClassID = item.ClassID;
                        CS.GroupID = item.GroupID;
                        CS.SubjectID = item.SubjectID;
                        CS.CompanyID = entity.CompanyID;
                        CS.CreatedBy = entity.CreatedBy;
                        CS.CreatedDate = cstTime;
                        CS.ModifyBy = entity.ModifyBy;
                        CS.ModifyDate = cstTime;
                        CS.Status = entity.Status;
                        result = await Uow.TblCourseSetupInfoRepository.Add(CS);
                        context.SaveChanges();
                    }
                    //entity.CreatedDate = cstTime;
                    //entity.ModifyDate = cstTime;
                    //result = await Uow.TblCourseSetupInfoRepository.Add(entity);
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
