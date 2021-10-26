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
using System.Web;

namespace CMS.Web.Controllers
{
    [RoutePrefix("api/ClassWiseSubjectInfo")]
    public class ClassWiseSubjectInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public ClassWiseSubjectInfoController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        [Route("GetAll/{CompanyID:int}")]
        [HttpGet]
        public dynamic GetAll(int CompanyID)
        {
            try
            {
                //var result = Uow.SectionInfoRepository.GetByCompanyID(m => m.CompanyID == CompanyID);
                //return result;
                var result = (from CWS in context.ClassWiseSubjectInfoes
                              join C in context.Classes on CWS.ClassID equals C.ClassID
                              join S in context.Subjects on CWS.SubjectID equals S.SubjectID
                              select new
                              {
                                  C.ClassName,                                
                                  S.SubjectName,
                                  CWS.ClassID,
                                  CWS.SubjectID,
                                  CWS.ClassSubjectID,
                                  CWS.CompanyID,
                                  CWS.CreatedBy,
                                  CWS.CreatedDate,
                                  CWS.ModifyBy,
                                  CWS.ModifyDate,
                                  CWS.Status
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
        public async Task<dynamic> Add([FromBody] ClassWiseSubjectInfo entity)
        {
            try
            {
                //DataSet ds = new DataSet();
                //int count = context.SectionInfoes.Count();
                //if (count > 0) { 

                var result = "";
                var search = context.ClassWiseSubjectInfoes.FirstOrDefault(m => m.ClassID == entity.ClassID && m.SubjectID == entity.SubjectID);
                if (search == null)
                {
                    entity.CreatedDate = cstTime;
                    entity.ModifyDate = cstTime;
                    result = await Uow.TblClassWiseSubjectInfoRepository.Add(entity);
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
        public async Task<dynamic> Update([FromBody] ClassWiseSubjectInfo entity)
        {
            try
            {
                entity.ModifyBy = entity.ModifyBy;
                entity.ModifyDate = cstTime;
                var result = await Uow.TblClassWiseSubjectInfoRepository.Update(entity);
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
