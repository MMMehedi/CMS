using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Repository.Repository
{
    public class tblUserRepositroy : GenericRepository<UserInfo>
    {
        public tblUserRepositroy(CMSEntities context) : base(context) { }

        public async Task<UserInfo> Login(string strUserName, string strPassword)
        {
            return await Task.FromResult(context.UserInfoes.SingleOrDefault(u => (u.Email == strUserName || u.Mobile == strUserName) && u.Password == strPassword));
        }
        
    }
}
