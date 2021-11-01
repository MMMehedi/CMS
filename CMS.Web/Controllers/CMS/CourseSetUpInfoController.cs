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



        [Route("Add")]
        [HttpPost]
        public async Task<dynamic> Add([FromBody] CourseSetup entity)
        {
            try
            {
                var result = "";
                var search = context.CourseSetups.FirstOrDefault(m => m.ClassID == entity.ClassID && m.GroupID == entity.GroupID && m.SubjectID == entity.SubjectID);
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
        [Route("GetAll/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAll(int CompanyID)
        {
            try
            {
                var result = new List<spCourseInformation_Result>();
                using (var cmd = context.Database.Connection.CreateCommand())
                {
                    cmd.CommandText = "exec spCourseInformation";
                    context.Database.Connection.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var ProductStock = new spCourseInformation_Result
                            {
                                CourseID = reader.GetInt32(0),
                                CourseName = reader.GetString(1),
                                CourseDurationID = reader.GetInt32(2),
                                DurationName = reader.GetString(3),
                                ClassID = reader.GetInt32(4),
                                ClassName = reader.GetString(5),
                                GroupID = reader.GetInt32(6),
                                GroupName = reader.GetString(7),
                                CompanyID = reader.GetInt32(8),
                                CreatedDate = reader.GetDateTime(9),
                                Status = reader.GetBoolean(10),
                                SubjectName = reader.GetString(11),
                            };
                            result.Add(ProductStock);
                        }
                    }
                    context.Database.Connection.Close();
                }
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
