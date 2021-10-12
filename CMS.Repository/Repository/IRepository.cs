using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CMS.Repository.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetByID(long Id);
        Task<IEnumerable<T>> FirstOrDefault(Expression<Func<T, bool>> predicate);
        Task<dynamic> Add(T entity);
        Task<dynamic> Update(T entity);
        Task<dynamic> Accept(T entity);
        Task<dynamic> Decline(T entity);
        Task<dynamic> Delete(long Id);
        Task<dynamic> Delete(T entity);
        Task FindBy(Func<dynamic, bool> p);
        IQueryable<T> GetByCompanyID(Expression<Func<T, bool>> predicate);
    }
}
