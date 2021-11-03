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
                var result = new List<spFeeSetUPInfo_Result>();
                using (var cmd = context.Database.Connection.CreateCommand())
                {
                    cmd.CommandText = "exec spFeeSetUPInfo";
                    context.Database.Connection.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var FeeInfo = new spFeeSetUPInfo_Result
                            {

                             TutionFeeID =  reader.GetInt32(0),
                             StudentTypeID = reader.GetInt32(1),
                             ClassID =  reader.GetInt32(2),
                             GroupID =  reader.GetInt32(3),
                             SubjectID = reader.GetInt32(4),
                             CourseID  = reader.GetInt32(5),
                             TutionFee = reader.GetDecimal(6),
                             CompanyID = reader.GetInt32(7),
                             CreatedBy =  reader.GetInt32(8),
                             CreatedDate = reader.GetDateTime(9),
                             Status = reader.GetBoolean(10),
                             StudentTypeName = reader.GetString(11),
                             CourseName = reader.GetString(12),
                             SubjectName =  reader.GetString(13),
                             GroupName = reader.GetString(14),
                             ClassName = reader.GetString(15),                                
                            };
                            result.Add(FeeInfo);
                        }
                    }
                    context.Database.Connection.Close();
                }
                return result;
            }
            catch (Exception Ex)
            {
                throw;
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
