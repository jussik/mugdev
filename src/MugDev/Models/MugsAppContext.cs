using Microsoft.Data.Entity;

namespace MugDev.Models
{
    public class MugsAppContext : DbContext
    {
        public DbSet<Mug> Mugs { get; set; }
    }
}