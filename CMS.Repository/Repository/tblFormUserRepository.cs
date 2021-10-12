using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VillageCourt.WebApi.Repository
{
    public class tblFormUserRepository : GenericRepository<tblFormUser>
    {
        public tblFormUserRepository(VCEntities context) : base(context) { }

        public string GetCrudStatus(Int32 intFormId, Int32 intUserId)
        {
            var CrudStatus = (from f in context.tblFormUsers
                              where f.FormID == intFormId && f.UserID == intUserId
                              select f).ToList();
            if (CrudStatus.Count() > 0)
            {
                return CrudStatus[0].CrudStatus.ToString();
            }
            return null;
        }
        public string DeletePermisionByUser(int intUserId)
        {
            IList<tblFormUser> listFormUser = (from u in context.tblFormUsers
                                               where u.UserID == intUserId
                                               select u).ToList();
            if (listFormUser.Count() > 0)
            {
                foreach (var user in listFormUser)
                {
                    context.tblFormUsers.Remove(user);
                }
                Save();
            }
            return null;
        }

        public IEnumerable<tblFormUser> GetFormUserByUserId(int intUserId)
        {
            IEnumerable<tblFormUser> listFormUser = (from f in context.tblFormUsers
                                                     where f.UserID == intUserId
                                                     select f).ToList();
            return listFormUser;
        }

    }
}
