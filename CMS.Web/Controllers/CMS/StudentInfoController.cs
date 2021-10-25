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
    [RoutePrefix("api/StudentInfo")]
    public class StudentInfoController : BaseController
    {
        CMSEntities context = new CMSEntities();
        DateTime cstTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.Now, TimeZoneInfo.Local.Id, "Bangladesh Standard Time");
        public StudentInfoController(IUnitOfWork uow)
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
                var result = (from S in context.StudentInformations
                              join SE in context.StudentAcademicInfoes on S.StudentID equals SE.StudentID
                              join SP in context.FMInformatons on S.StudentID equals SP.StudentID
                              join C in context.Classes on SE.ClassID equals C.ClassID
                              join SS in context.Shifts on SE.ShiftID equals SS.ShiftID
                              select new
                              {
                                  S.StudentID,
                                  S.StudentCode,
                                  SE.SAcademicID,
                                  SP.FMID,
                                  S.StudentName,
                                  S.DOB,
                                  S.BRN,
                                  S.ReligionId,
                                  S.GenderID,
                                  S.BloodID,
                                  S.PresentAddress,
                                  S.PermanentAddress,
                                  S.StudentMobile,
                                  S.GuardianMobile,
                                  S.Picture,
                                  SE.ShiftID,
                                  SE.ClassID,
                                  SE.GroupID,
                                  SE.SectionID,
                                  SE.RollNo,
                                  SP.FatherName,
                                  SP.FNID,
                                  SP.FProfession,
                                  SP.FProfessionType,
                                  SP.MotherName,
                                  SP.MNID,
                                  SP.MProfession,
                                  SP.MProfessionType,
                                  S.CreatedBy,
                                  S.CreatedDate, 
                                  C.ClassName,
                                  SS.ShiftName,                          
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
                //DataSet ds = new DataSet();
                //int count = context.SectionInfoes.Count();
                //if (count > 0) { 

                var result = "";
                var search = context.SectionInfoes.FirstOrDefault(m => m.ClassID == entity.ClassID && m.SectionName == entity.SectionName);
                if (search == null)
                {
                    entity.CreateDate = cstTime;
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


        public dynamic StudentImage()
        {
            using (var dbContextTransaction = context.Database.BeginTransaction())
            {
                try
                {
                    StudentInformation objstudent = new StudentInformation();
                    //objstudent.StudentID = Convert.ToInt32(HttpContext.Current.Request.Form["StudentID"]);
                    objstudent.StudentCode = HttpContext.Current.Request.Form["StudentCode"].ToString();
                    objstudent.StudentName = HttpContext.Current.Request.Form["StudentName"].ToString();
                    objstudent.DOB = Convert.ToDateTime(HttpContext.Current.Request.Form["DOB"]);
                    objstudent.BRN = HttpContext.Current.Request.Form["BRN"].ToString();
                    objstudent.ReligionId = Convert.ToInt32(HttpContext.Current.Request.Form["ReligionID"].ToString());
                    objstudent.GenderID = Convert.ToInt32(HttpContext.Current.Request.Form["GenderID"].ToString());
                    objstudent.BloodID = Convert.ToInt32(HttpContext.Current.Request.Form["BloodID"].ToString());
                    objstudent.PresentAddress = HttpContext.Current.Request.Form["PresentAddress"].ToString();
                    objstudent.PermanentAddress = HttpContext.Current.Request.Form["PermanentAddress"].ToString();
                    objstudent.StudentMobile = HttpContext.Current.Request.Form["StudentMobile"].ToString();
                    objstudent.GuardianMobile = HttpContext.Current.Request.Form["GuardianMobile"].ToString();
                    objstudent.CompanyID = Convert.ToInt32(HttpContext.Current.Request.Form["CompanyID"]);
                    objstudent.Status = Convert.ToBoolean(HttpContext.Current.Request.Form["Status"].ToString());
                    objstudent.Remarks = HttpContext.Current.Request.Form["Remarks"].ToString();
                    objstudent.CreatedBy = Convert.ToInt32(HttpContext.Current.Request.Form["CreatedBy"]);
                    objstudent.CreatedDate = Convert.ToDateTime(HttpContext.Current.Request.Form["CreatedDate"].ToString());
                    objstudent.ModifyBy = Convert.ToInt32(HttpContext.Current.Request.Form["ModifyBy"]);
                    objstudent.ModifyDate = Convert.ToDateTime(HttpContext.Current.Request.Form["ModifyDate"].ToString());



                    StudentAcademicInfo objAcademicStudent = new StudentAcademicInfo();
                    objAcademicStudent.SAcademicID = Convert.ToInt32(HttpContext.Current.Request.Form["SAcademicID"]);
                    objAcademicStudent.ShiftID = Convert.ToInt32(HttpContext.Current.Request.Form["ShiftID"]);
                    objAcademicStudent.ClassID = Convert.ToInt32(HttpContext.Current.Request.Form["ClassID"]);
                    objAcademicStudent.SectionID = Convert.ToInt32(HttpContext.Current.Request.Form["SectionID"]);
                    objAcademicStudent.GroupID = Convert.ToInt32(HttpContext.Current.Request.Form["GroupID"].ToString());
                    objAcademicStudent.RollNo = HttpContext.Current.Request.Form["RollNo"].ToString();
                    objAcademicStudent.CompanyID = Convert.ToInt32(HttpContext.Current.Request.Form["CompanyID"]);
                    objAcademicStudent.CreatedBy = Convert.ToInt32(HttpContext.Current.Request.Form["CreatedBy"]);
                    objAcademicStudent.CreatedDate = Convert.ToDateTime(HttpContext.Current.Request.Form["CreatedDate"].ToString());
                    objAcademicStudent.ModifyBy = Convert.ToInt32(HttpContext.Current.Request.Form["ModifyBy"]);
                    objAcademicStudent.ModifyDate = Convert.ToDateTime(HttpContext.Current.Request.Form["ModifyDate"].ToString());
                    objAcademicStudent.Status = Convert.ToBoolean(HttpContext.Current.Request.Form["Status"].ToString());


                    FMInformaton objStudentsParent = new FMInformaton();
                    objStudentsParent.FMID = Convert.ToInt32(HttpContext.Current.Request.Form["FMID"]);
                    objStudentsParent.FatherName = HttpContext.Current.Request.Form["FatherName"].ToString();
                    objStudentsParent.FNID = HttpContext.Current.Request.Form["FNID"].ToString();
                    objStudentsParent.FProfession = HttpContext.Current.Request.Form["FProfession"].ToString();
                    objStudentsParent.FProfessionType = Convert.ToInt32(HttpContext.Current.Request.Form["FProfessionType"].ToString());
                    objStudentsParent.FYearlyIncome = Convert.ToInt32(HttpContext.Current.Request.Form["FYearlyIncome"]);
                    objStudentsParent.FMobile = HttpContext.Current.Request.Form["FMobile"].ToString();
                    objStudentsParent.MotherName = HttpContext.Current.Request.Form["MotherName"].ToString();
                    objStudentsParent.MNID = HttpContext.Current.Request.Form["MNID"].ToString();
                    objStudentsParent.MProfession = HttpContext.Current.Request.Form["MProfession"].ToString();
                    objStudentsParent.MProfessionType = Convert.ToInt32(HttpContext.Current.Request.Form["MProfessionType"].ToString());
                    objStudentsParent.MYearlyIncome = Convert.ToInt32(HttpContext.Current.Request.Form["MYearlyIncome"]);
                    objStudentsParent.MMobile = HttpContext.Current.Request.Form["MMobile"].ToString();
                    objStudentsParent.CompanyID = Convert.ToInt32(HttpContext.Current.Request.Form["CompanyID"]);
                    objStudentsParent.CreatedBy = Convert.ToInt32(HttpContext.Current.Request.Form["CreatedBy"]);
                    objStudentsParent.CreatedDate = Convert.ToDateTime(HttpContext.Current.Request.Form["CreatedDate"].ToString());
                    objStudentsParent.ModifyBy = Convert.ToInt32(HttpContext.Current.Request.Form["ModifyBy"]);
                    objStudentsParent.ModifyDate = Convert.ToDateTime(HttpContext.Current.Request.Form["ModifyDate"].ToString());
                    objStudentsParent.Status = Convert.ToBoolean(HttpContext.Current.Request.Form["Status"].ToString());

                    var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                    if (httpPostedFile != null)
                    {
                        var httpContext = HttpContext.Current;
                        try
                        {
                            //Check for any uploaded file
                            if (httpContext.Request.Files.Count > 0)
                            {
                                //Loop through uploaded files
                                for (int i = 0; i < httpContext.Request.Files.Count; i++)
                                {
                                    HttpPostedFile file = httpContext.Request.Files[i];
                                    if (file != null && objstudent.StudentID == 0)
                                    {

                                        int StdID = 0;
                                        int year = DateTime.Now.Year;
                                        int month = DateTime.Now.Month;
                                        var pid = (from p in context.StudentInformations
                                                   where p.CreatedDate.Year == year
                                                   select new { p.StudentID }).ToList(); ;
                                        if (pid.Count() > 0)
                                        {
                                            StdID = Convert.ToInt32(pid.Select(p => p.StudentID).Max() + 1);
                                        }
                                        else
                                        {
                                            StdID += 1;
                                        }
                                        var ext = Path.GetExtension(file.FileName);
                                        var name = Path.GetFileNameWithoutExtension(file.FileName);
                                        //var aaaaa = file.FileName;
                                        var aaaa = StdID + ext;
                                        var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Img/"), aaaa);
                                        //Save the uploaded file
                                        objstudent.Picture = fileSavePath;
                                        file.SaveAs(fileSavePath);
                                        //context.StudentInformations.Add(objstudent);
                                        //Context.SaveChanges();

                                    }
                                    else if (file != null && objstudent.StudentID > 0)
                                    {

                                        int StdID = 0;
                                        int year = DateTime.Now.Year;
                                        int month = DateTime.Now.Month;
                                        var pid1 = (from p in context.StudentInformations
                                                    where p.StudentID == objstudent.StudentID
                                                    select new { p.StudentID }).Single(); ;
                                        if (pid1.StudentID > 0)
                                        {
                                            StdID = Convert.ToInt32(pid1.StudentID);
                                        }
                                        else
                                        {
                                            StdID += 1;
                                        }
                                        var ext = Path.GetExtension(file.FileName);
                                        var name = Path.GetFileNameWithoutExtension(file.FileName);
                                        //var aaaaa = file.FileName;
                                        var aaaa = StdID + ext;
                                        //string ImgName = file.FileName;
                                        //var name1 = ImgName.Split('.');

                                        //string filename = name1[0];
                                        //string fileext = name1[1];
                                        //Construct file save path
                                        var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Img/"), aaaa);

                                        //Save the uploaded file
                                        objstudent.Picture = fileSavePath;
                                        file.SaveAs(fileSavePath);
                                        //context.StudentInformations.Add(objstudent);
                                        //Context.SaveChanges();

                                    }
                                }
                            }
                        }
                        catch
                        {
                            return false;
                        }
                    }
                    else
                    {
                        CMSEntities db = new CMSEntities();
                        var StdImage = (from p in db.StudentInformations
                                        where p.StudentID == objstudent.StudentID
                                        select new { p.Picture }).ToList();
                        if (StdImage.Count > 0)
                            objstudent.Picture = StdImage[0].Picture;//../Images/NoFile.jpg

                        else
                        {
                            string filepath = "../assets/images/NoPreview.jpg";
                            string directoryName = Path.GetDirectoryName(filepath);
                            //string image = Directory.GetFiles(filepath);
                            objstudent.Picture = directoryName;
                        }

                    }

                    if (objstudent.StudentID == 0)
                    {
                        var Std = "";
                        int StdID = 0;
                        int year = DateTime.Now.Year;
                        int month = DateTime.Now.Month;
                        var pid = (from p in context.StudentInformations
                                   where p.CreatedDate.Year == year
                                   select new { p.StudentID }).ToList(); ;
                        if (pid.Count() > 0)
                        {
                            StdID = Convert.ToInt32(pid.Select(p => p.StudentID).Max() + 1);
                        }
                        else
                        {
                            StdID += 1;
                        }
                        Std = "Std-" + DateTime.Now.Year + DateTime.Now.Month + StdID.ToString().PadLeft(6, '0');
                        objstudent.StudentCode = Std;
                        var result = context.StudentInformations.Add(objstudent);
                        context.SaveChanges();
                        //Student Academic Info
                        objAcademicStudent.StudentID = objstudent.StudentID;
                        context.StudentAcademicInfoes.Add(objAcademicStudent);
                        context.SaveChanges();
                        //Student Parent Info
                        objStudentsParent.StudentID = objstudent.StudentID;
                        context.FMInformatons.Add(objStudentsParent);
                        context.SaveChanges();
                        dbContextTransaction.Commit();
                        return Json("Data Save Succesfully");
                    }
                    else
                    {
                        objstudent.StudentID = Convert.ToInt32(HttpContext.Current.Request.Form["StudentID"]);
                        context.StudentInformations.Attach(objstudent);
                        context.Entry(objstudent).State = EntityState.Modified;                       
                        context.SaveChanges();
                        //Student Academic Info
                        objAcademicStudent.StudentID = objstudent.StudentID;
                        context.StudentAcademicInfoes.Attach(objAcademicStudent);
                        context.Entry(objAcademicStudent).State = EntityState.Modified;
                        //context.StudentAcademicInfoes.Add(objAcademicStudent);
                        context.SaveChanges();
                        //Student Parent Info
                        objStudentsParent.StudentID = objstudent.StudentID;
                        context.FMInformatons.Attach(objStudentsParent);
                        context.Entry(objStudentsParent).State = EntityState.Modified;
                        //context.FMInformatons.Add(objStudentsParent);
                        context.SaveChanges();
                        dbContextTransaction.Commit();
                        return Json("Data Update succesful");
                    }
                }
                catch (Exception ex)
                {
                    
                    dbContextTransaction.Rollback();
                }

            }
            return "";

        }
    }
}
