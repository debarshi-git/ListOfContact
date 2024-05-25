using contactList.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace contactList.Data
{
    public class ContactlyDbContext : DbContext
    {
        public ContactlyDbContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Contact> Contacts { get; set; }
    }
}
